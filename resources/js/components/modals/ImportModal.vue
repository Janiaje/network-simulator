<template>
    <modal :id="'importGraph'">
        <template v-slot:header>
            Import
        </template>

        <template v-slot:body>
            <div class="form-group">
                <label for="exportType">Choose import type</label>
                <select class="form-control" id="exportType" v-model="type">
                    <option value="CSV">CSV</option>
                    <option value="GephiJSON">Gephi JSON</option>
                </select>
            </div>

            <div class="row" v-show="type === 'CSV'">
                <div class="col-12">
                    <div class="form-group">
                        <label for="nodeListFile">Upload node-list file</label>
                        <b-form-file
                            id="nodeListFile"
                            v-model="nodeListFile"
                            :state="Boolean(nodeListFile)"
                            placeholder="Choose a file..."
                            drop-placeholder="Drop file here..."
                        ></b-form-file>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label for="edgeListFile">Upload edge-list file</label>
                        <b-form-file
                            id="edgeListFile"
                            v-model="edgeListFile"
                            :state="Boolean(edgeListFile)"
                            placeholder="Choose a file..."
                            drop-placeholder="Drop file here..."
                        ></b-form-file>
                    </div>
                </div>
            </div>

            <div class="row" v-show="type === 'GephiJSON'">
                <div class="col-12">
                    <div class="form-group">
                        <label for="gephiFile">
                            Upload
                            <a href="https://gephi.org/plugins/#/plugin/jsonexporter-plugin" target="_blank">Gephi
                                JSON</a>
                            file
                        </label>
                        <b-form-file
                            id="gephiFile"
                            v-model="gephiFile"
                            :state="Boolean(gephiFile)"
                            placeholder="Choose a file..."
                            drop-placeholder="Drop file here..."
                        ></b-form-file>
                    </div>
                </div>
            </div>

            <div class="row form-group">
                <div class="col-12" v-show="type === 'GephiJSON'">
                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="gephiFixed" v-model="gephiFixed">
                        <label class="custom-control-label" for="gephiFixed">Fix in place after import</label>
                    </div>
                </div>
                <div class="col-12" v-show="type === 'GephiJSON'">
                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="gephiParseColor"
                               v-model="gephiParseColor">
                        <label class="custom-control-label" for="gephiParseColor">
                            Parse the color instead of copy (adds borders, highlights etc.)
                        </label>
                    </div>
                </div>
                <div class="col-12">
                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="directed" v-model="directed">
                        <label class="custom-control-label" for="directed">Directed graph</label>
                    </div>
                </div>
            </div>
        </template>

        <template v-slot:footer>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="importGraph">
                Import
            </button>
        </template>
    </modal>
</template>

<script>
    import {BFormFile} from 'bootstrap-vue';

    Vue.component('b-form-file', BFormFile);

    export default {
        name: "ImportModal",
        data() {
            return {
                type: 'CSV',
                directed: false,

                nodeListFile: null,
                nodeListFileContent: null,
                edgeListFile: null,
                edgeListFileContent: null,
                gephiFile: null,
                gephiFixed: true,
                gephiParseColor: true
            }
        },

        methods: {
            importGraph() {
                let file, reader;

                switch (this.type) {
                    case 'CSV':
                        // TODO: better binding

                        file = $('#nodeListFile')[0].files[0];
                        if (file === undefined) {
                            alert('Your current browser does not support drag & drop!');
                            return;
                        }
                        reader = new FileReader();
                        reader.onload = (e) => {
                            this.nodeListFileContent = e.target.result;
                            this.CSVUploadFinished();
                        };
                        reader.readAsText(file);

                        file = $('#edgeListFile')[0].files[0];
                        if (file === undefined) {
                            alert('Your current browser does not support drag & drop!');
                            return;
                        }
                        reader = new FileReader();
                        reader.onload = (e) => {
                            this.edgeListFileContent = e.target.result;
                            this.CSVUploadFinished();
                        };
                        reader.readAsText(file);

                        break;
                    case 'GephiJSON':
                        file = $('#gephiFile')[0].files[0];
                        if (file === undefined) {
                            alert('Your current browser does not support drag & drop!');
                            return;
                        }
                        reader = new FileReader();
                        reader.onload = (e) => {
                            this.gephiJSONUploadFinished(e.target.result);
                        };
                        reader.readAsText(file);


                        break;
                    default:
                        return;
                }
            },

            CSVUploadFinished() {
                if (this.nodeListFileContent === null || this.edgeListFileContent === null) {
                    return;
                }

                mainDisplayedGraph.importCSV(this.nodeListFileContent, this.edgeListFileContent, this.directed);
            },

            gephiJSONUploadFinished(json) {
                // TODO: decrease / turn off physics if  the graph is too big

                json = JSON.parse(json);
                mainDisplayedGraph.importGephiJSON(json, this.directed, this.gephiFixed, this.gephiParseColor);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>

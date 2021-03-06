<template>
    <div id="edit-actions" class="inner-window" v-show="show">
        <div id="container">
            <div class="row">
                <div class="col-2">
                    <button @click="show = false">
                        <font-awesome-icon icon="times"/>
                    </button>
                </div>
                <div class="col-5">
                    <button @click="addNodeStart">
                        <font-awesome-icon icon="plus"/>
                        Add Node
                    </button>
                </div>
                <div class="col-5">
                    <button @click="addEdgeStart">
                        <font-awesome-icon icon="plus"/>
                        Add Edge
                    </button>
                </div>
            </div>
            <div class="row" v-show="selected">
                <div class="col-12">
                    <button @click="edit">
                        <font-awesome-icon icon="pencil-alt"/>
                        Edit {{ nodeSelected ? 'node' : 'edge' }}
                    </button>
                </div>
            </div>
            <div class="row" v-show="selected">
                <div class="col-12">
                    <button @click="remove">
                        <font-awesome-icon icon="times"/>
                        Remove {{ nodeSelected ? 'node' : 'edge' }}
                    </button>
                </div>
            </div>
            <div id="stacked-content" v-show="helpText" @click="disableEditMode">
                <p :style="{ 'line-height': lineHeight }">{{ helpText }}</p>
                <p :style="{ 'line-height': lineHeight }">or click here to cancel</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditActions",
        data() {
            return {
                show: false,
                nodeSelected: false,
                edgeSelected: false,
                helpText: '',
            }
        },

        methods: {
            networkEditCallback() {
                this.show = true;
            },

            addNodeStart() {
                mainDisplayedGraph.network.addNodeMode();
                this.helpText = 'Click somewhere to add a node';
            },

            addEdgeStart() {
                mainDisplayedGraph.network.addEdgeMode();
                this.helpText = 'Drag an edge between the nodes';
            },

            disableEditMode() {
                mainDisplayedGraph.network.disableEditMode();
                this.helpText = '';
            },

            networkClickedCallback(data) {
                this.nothingSelected();

                if (data.nodes.length > 0) {
                    this.nodeSelected = true;
                } else if (data.edges.length > 0) {
                    this.edgeSelected = true;
                }
            },

            edit() {
                if (this.nodeSelected) {
                    mainDisplayedGraph.network.editNode();
                } else {
                    mainDisplayedGraph.network.editEdgeMode();
                }
            },

            remove() {
                mainDisplayedGraph.network.deleteSelected();
                this.nothingSelected();
            },

            elementAddedCallback() {
                this.helpText = '';
                this.nothingSelected();
            },

            nothingSelected() {
                this.nodeSelected = false;
                this.edgeSelected = false
            }
        },

        computed: {
            selected() {
                return this.nodeSelected || this.edgeSelected;
            },

            lineHeight() {
                return this.selected ? '37px' : '18.5px';
            }
        },

        mounted() {
            eventHub.$on('network-edit', this.networkEditCallback);

            eventHub.$on('network-clicked', this.networkClickedCallback);
            eventHub.$on('network-element-added', this.elementAddedCallback);
        },

        destroyed() {
            eventHub.$off('network-edit', this.networkEditCallback);

            eventHub.$off('network-clicked', this.networkClickedCallback);
            eventHub.$off('network-element-added', this.elementAddedCallback);
        }
    }
</script>

<style lang="scss" scoped>
    #edit-actions {
        top: 65px;
    }

    #container {
        position: relative;
    }

    #stacked-content {
        position: absolute;
        top: 0;

        height: 100%;
        width: calc(100% + 30px);

        margin: 0 -15px;

        background: rgba(255, 255, 255, 0.9);

        p {
            margin: 0;
            text-align: center;

            font-weight: bold;
        }
    }
</style>

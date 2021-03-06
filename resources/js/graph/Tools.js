const cloneDeep = require('lodash.clonedeep');

class Tools {
    /**
     * Create range (array containing all the numbers from-to the given parameters).
     *
     * @param from {Number}
     * @param to {Number}
     *
     * @returns {Array.<Number>}
     */
    static range(from, to) {
        return [...Array(to - from + 1).keys()]
            .map(value => value + from);
    }

    /**
     * Checks if array includes object.
     *
     * @param array {Array}
     * @param object {Object}
     * @param comparison {function(Object, Object):Boolean}
     *
     * @returns {Boolean}
     */
    static objectInArray(array, object, comparison) {
        for (let i = 0; i < array.length; i++) {
            if (comparison(object, array[i])) {
                return true;
            }
        }

        return false;
    }

    /**
     * Clone the given parameter (copy the variable in the memory).
     *
     * @param variable {*}
     *
     * @returns {*}
     */
    static clone(variable) {
        return cloneDeep(variable);
    }

    /**
     * Access Object's property by the given access string.
     * eg.: 'a1.a2.a3' will result in the same as
     *      object['a1']['a2']['a3']
     *
     * @param object {Object}
     * @param string {String}
     *
     * @returns {Object}
     */
    static accessObjectPropertyByString(object, string) {
        if (string === '') {
            return object;
        }

        string = string.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        string = string.replace(/^\./, '');           // strip a leading dot

        const a = string.split('.');
        for (let i = 0, n = a.length; i < n; ++i) {
            const k = a[i];
            if (k in object) {
                object = object[k];
            } else {
                return object;
            }
        }

        return object;
    }

    /**
     * Returns a nodeList with only the properties specified in the _exportNodeListFormat list.
     *
     * @param propertyNamesArray {Array.<string>}
     * @param arrayOfObjects {Array.<Object>}
     *
     * @returns {Array.<Object>}
     */
    static formatObjectList(propertyNamesArray, arrayOfObjects) {
        return arrayOfObjects.map(object => {
            let newObject = {};

            propertyNamesArray.forEach(key => newObject[key] = object[key]);

            return newObject;
        });
    }

    /**
     * Returns data string with the given separator line by line for the header.
     *
     * @param separator {string}
     * @param header Array.<string>
     * @param rows Array.<Object>
     *
     * @returns {string}
     */
    static createDataFile(separator, header, rows) {
        rows = rows.map(node => {
            let row = [];

            header.forEach(key => row.push(node[key]));

            row = row.join(separator);

            return row;
        });

        header = header.join(separator);

        let csv = [header].concat(rows);
        csv = csv.join("\n");

        return csv;
    }

    /**
     * Returns parsed data string as object.
     *
     * @param separator {string}
     * @param dataString {string}
     *
     * @returns {{nodes: *, header: *}}
     */
    static parseDataFile(separator, dataString) {
        let parts = dataString.split("\n");
        let header = parts.shift().split(separator);

        return parts.map(row => {
            row = row.split(separator);
            let rowObject = {};

            for (let i = 0; i < header.length; i++) {
                rowObject[header[i]] = row[i];
            }

            return rowObject;
        });
    }

    /**
     * Returns the current epoch time.
     *
     * @returns {Number}
     */
    static getEpochTime() {
        return (new Date).getTime();
    }

    /**
     * Returns formatted date-time string.
     *
     * @returns {string}
     */
    static getFormattedDate() {
        const date = new Date();
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "_" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    }

    /**
     * Returns formatted date-time string.
     *
     * @param filename {string}
     * @param text {string}
     */
    static downloadText(filename, text) {
        // TODO: refactor (cant handle long texts)
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    /**
     * Same as groupBy but it only uses the last value of duplicates in the array.
     *
     * @param array {Array.<Object>}
     * @param objectKey {string}
     *
     * @returns {Object}
     */
    static sortArrayIntoObject(array, objectKey = 'id') {
        let object = {};

        array.forEach(item => object[item[objectKey]] = item);

        return object;
    }

    /**
     * Groups the array into an Object by the given key.
     *
     * @param array {Array.<Object>}
     * @param objectKey {string}
     *
     * @returns {Object}
     */
    static groupBy(array, objectKey = 'id') {
        let object = {};

        array.forEach(item => {
            let itemArray = object[item[objectKey]] !== undefined ? object[item[objectKey]] : [];
            itemArray.push(item);

            object[item[objectKey]] = itemArray;
        });

        return object;
    }

    /**
     * Returns only the distinct values in the given array.
     *
     * @param array {Array}
     *
     * @returns {Array}
     */
    static distinct(array) {
        return [...new Set(array)];
    }

    /**
     * Same as filter only changing the the original array.
     *
     * @param array {Array.<Object>}
     * @param compareLambda {function(Object):Boolean}
     */
    static splice(array, compareLambda) {
        let indexes = [];

        array.forEach((item, index) => {
            if (compareLambda(item)) {
                indexes.push(index);
            }
        });

        for (let i; (i = indexes.pop()) !== undefined;) {
            array.splice(i, 1);
        }
    }

    /**
     * Splice out the edge from the array.
     *
     * @param array {Array.<Object>}
     * @param edge {Object}
     */
    static spliceById(array, edge) {
        Tools.splice(array, (a) => a.id === edge.id)
    }

    /**
     * Throws an exception with the method not implemented text.
     *
     * @param className {string}
     * @param methodName {string}
     *
     * @throws Exception
     */
    static throwMethodNotImplemented(className, methodName) {
        throw `'${className}.${methodName}' method is not implemented!`;
    }

    /**
     * Returns the class' name from the static scope.
     *
     * @param classObject {Object}
     *
     * @returns {string}
     */
    static getClassNameFromStaticScope(classObject) {
        return classObject.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
    }

    /**
     * Returns the class' name of the object.
     *
     * @param object {Object}
     *
     * @returns {string}
     */
    static getClassName(object) {
        return object.constructor.name;
    }

    /**
     * Run the given callback while showing the loading screen.
     *
     * @param callback {function():void}
     */
    static runWithLoadingScreen(callback) {
        eventHub.$emit('loading-show');

        // TODO-low: find better solution: https://stackoverflow.com/questions/57536336
        // only working in Chrome
        app.$nextTick();

        requestAnimationFrame(() =>
            requestAnimationFrame(() => {
                callback();

                eventHub.$emit('loading-hide');
            }));
    }

    static getCurrentMemoryUsage() {
        return window.performance.memory !== undefined ? window.performance.memory.usedJSHeapSize : 0;
    }

    static randomIntBetween(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    static round(number, decimals) {
        let multiplier = Math.pow(10, decimals);
        return Math.round(number * multiplier) / multiplier;
    }
}

export default Tools;

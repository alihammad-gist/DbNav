///<reference path="../../typings/tsd.d.ts"/>
/**
 * Checks if provided object is empty
 * @param  {Object}  value
 * @return {boolean}
 */
function isEmpty(value) {
    return Boolean(value && typeof value == 'object') && !Object.keys(value).length;
}
;
/**
 * Returns children of passed reactnode [renderedOutput of shadowRenderer]
 * pass in list of arguments after tree as index to be retreived
 * @param  {any}                tree Pass by value
 * @param  {string[]}           idx  Path to desired node
 * @return {ReactExpectation[]}
 */
function getNodeOfTree(tree) {
    var idx = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        idx[_i - 1] = arguments[_i];
    }
    var nest = Array.prototype.slice.call(idx, 1);
    for (var i = 0; i < nest.length; i++) {
        if (!tree || !tree.hasOwnProperty(nest[i])) {
            return null;
        }
        tree = tree[nest[i]];
    }
    return tree;
}
//# sourceMappingURL=test_utils.js.map
///<reference path="../../typings/tsd.d.ts"/>
;
;
function convertToElementExpectation(r) {
    var exp = {};
    exp.type = r.type;
    exp.ref = r.ref;
    exp.key = r.key;
    var props = getNodeOfTree(r, '_store', 'props');
    if (props) {
        var children = getNodeOfTree(props, 'children');
        if (children) {
            if (typeof children === 'string') {
                exp.children = children;
            }
            else {
                exp.children = new Array();
                for (var k in children) {
                    if (children.hasOwnProperty(k)) {
                        exp.children.push(convertToElementExpectation(children[k]));
                    }
                }
            }
        }
        delete props.children;
        exp.props = props;
    }
    return exp;
}
exports.convertToElementExpectation = convertToElementExpectation;
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
    for (var i = 0; i < idx.length; i++) {
        if (!tree || !tree.hasOwnProperty(idx[i])) {
            return null;
        }
        tree = tree[idx[i]];
    }
    return tree;
}
//# sourceMappingURL=react_utils.js.map
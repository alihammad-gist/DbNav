///<reference path="tree.d.ts"/>
///<reference path="../../typings/tsd.d.ts"/>
var React = require('react');
var DOM = React.DOM;
function createUl(data, props) {
    var items = [];
    for (var i = 0; i < data.length; i++) {
        var content_nodes = [];
        content_nodes.push(props.factory(data[i]));
        if (data[i].hasOwnProperty(props.children_hash)) {
            var nestedData = data[i][props.children_hash];
            if (typeof nestedData !== 'string' && typeof nestedData !== "number") {
                content_nodes.push(createUl(nestedData, props));
            }
        }
        items.push(createLi(i, content_nodes));
    }
    return DOM.ul({}, items);
}
exports.createUl = createUl;
function createLi(key, el) {
    return DOM.li({ key: key }, el);
}
//# sourceMappingURL=helper.js.map
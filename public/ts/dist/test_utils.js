///<reference path="../../typings/tsd.d.ts"/>
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
function checkReactTree(exp, el, t) {
    return false;
}
exports.checkReactTree = checkReactTree;
function convertReactElToReactExpectation(el) {
    var renderer = TestUtils.createRenderer();
    renderer.render(el);
    var tree = renderer.getRenderOutput(), exp;
    console.log(JSON.stringify(truncateReactRenderedOutput(tree), null, 4));
}
exports.convertReactElToReactExpectation = convertReactElToReactExpectation;
function truncateReactRenderedOutput(tree) {
    var exp;
    for (var key in tree) {
        if (tree.hasOwnProperty(key)) {
            exp = { type: tree[key]['type'], key: tree[key]['key'] };
            if (tree[key].hasOwnProperty('_store')) {
                if (tree[key]['_store'].hasOwnProperty('props')) {
                    var p = tree[key]['_store']['props'];
                    // has children
                    if (p.hasOwnProperty('children')) {
                        exp.children = truncateReactRenderedOutput(p['children']);
                    }
                    delete p['children'];
                    exp.props = p;
                }
            }
        }
    }
    return exp;
}
//# sourceMappingURL=test_utils.js.map
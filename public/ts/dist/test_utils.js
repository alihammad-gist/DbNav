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
}
exports.convertReactElToReactExpectation = convertReactElToReactExpectation;
function truncateReactRenderedOutput(tree) {
    var exp;
    for (var key in tree) {
        if (tree.hasOwnProperty(key)) {
            switch (key) {
                case '_store':
                    break;
            }
        }
    }
}
//# sourceMappingURL=test_utils.js.map
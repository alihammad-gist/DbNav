///<reference path="tree.d.ts"/>
///<reference path="../../typings/tsd.d.ts"/>
var test = require('tape');
var helper = require('./helper');
var React = require('react/addons');
var utils = require('./react_utils');
var TestUtils = React.addons.TestUtils;
var DOM = React.DOM;
test("Testing buildUl", function (t) {
    t.pass();
    var d = [{ "": "" }];
    var props = {
        data: d,
        factory: function (item) {
            return DOM.i({ id: "italic-master", className: "italic-group" }, "hello");
        },
        children_hash: "pages"
    };
    var r = TestUtils.createRenderer();
    r.render(helper.createUl(d, props));
    console.log(JSON.stringify(utils.convertToElementExpectation(r.getRenderOutput()), null, 2));
});
//# sourceMappingURL=helper_test.js.map
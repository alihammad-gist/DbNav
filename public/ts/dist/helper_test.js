///<reference path="tree.d.ts"/>
///<reference path="../../typings/tsd.d.ts"/>
var test = require('tape');
var helper = require('./helper');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var DOM = React.DOM;
test("Testing buildUl", function (t) {
    t.pass();
    var d = [{ "": "" }];
    var props = {
        data: d,
        factory: function (item) {
            return DOM.i({}, "hello");
        },
        children_hash: "pages"
    };
    var renderer = TestUtils.createRenderer();
    renderer.render(helper.createUl(d, props));
    console.log(JSON.stringify(renderer.getRenderOutput()));
});
//# sourceMappingURL=helper_test.js.map
///<reference path="tree.d.ts"/>
///<reference path="../../typings/tsd.d.ts"/>

import test = require('tape');
import helper = require('./helper');
import React = require('react/addons');
import utils = require('./react_utils');

const TestUtils = React.addons.TestUtils;
const DOM = React.DOM;

type TreeData = Tree.Item[]
type TreeProps = Tree.TreeProps
type ReactElement = React.ReactElement<any>

interface ExpectationData {
    data: TreeData
    props: Tree.TreeProps
    structure: utils.ElementExpectation
}

test("Testing buildUl", (t) => {
    t.pass();
    const d: Tree.Data = [{"":""}];
    const props: TreeProps = {
        data: d,
        factory: (item: Tree.Item): ReactElement => {
            return DOM.i({id: "italic-master", className: "italic-group"}, "hello");
        },
        children_hash: "pages"
    };
    var r = TestUtils.createRenderer();
    r.render(helper.createUl(d, props));
});
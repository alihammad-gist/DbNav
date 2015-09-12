///<reference path="tree.d.ts"/>
///<reference path="../../typings/tsd.d.ts"/>

import test = require('tape');
import helper = require('./helper');
import React = require('react/addons');

const TestUtils = React.addons.TestUtils;
const DOM = React.DOM;

type TreeData = Tree.Item[]
type TreeProps = Tree.TreeProps
type ReactElement = React.ReactElement<any>

interface ExpectationData {
    data: TreeData
    props: Tree.TreeProps
    structure: string
}

test("Testing buildUl", (t) => {
    t.pass();
    const d: Tree.Data = [{"":""}];
    const props: TreeProps = {
        data: d,
        factory: (item: Tree.Item): ReactElement => {
            return DOM.i({}, "hello");
        },
        children_hash: "pages"
    };
    const renderer = TestUtils.createRenderer();
    renderer.render(helper.createUl(d, props));
    console.log(JSON.stringify(renderer.getRenderOutput()));
});
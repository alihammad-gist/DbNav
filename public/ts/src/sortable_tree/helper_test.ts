///<reference path="tree.d.ts"/>
///<reference path="../../typings/tsd.d.ts"/>

import test = require('tape');
import helper = require('./helper');
import React = require('react/addons');

const TestUtils = React.addons.TestUtils;

interface ExpectationData {
    data: Tree.Data
    props: Tree.TreeProps
    structure: string
}

test("Testing buildUl", (t) => {

    console.log();
});
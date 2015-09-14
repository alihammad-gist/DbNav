///<reference path="../../typings/tsd.d.ts"/>

import React = require('react/addons');
import Tape = require('tape');

interface ExpectationProps {
    [key: string]: any
}

interface ReactExpectation {
    type: string
    key?: string
    props?: ExpectationProps
    children?: ReactExpectation[] | string
}

const TestUtils = React.addons.TestUtils;


export function checkReactTree(exp: ReactExpectation, el: React.ReactElement<any>, t: Tape.Test): boolean {

    return false;
}

export function convertReactElToReactExpectation(el: React.ReactElement<any>): ReactExpectation {
    const renderer = TestUtils.createRenderer();
    renderer.render(el);
    var tree = renderer.getRenderOutput(),
        exp: ReactExpectation;
    console.log(JSON.stringify(tree, null, 4));
    console.log(JSON.stringify(truncateReactRenderedOutput(tree), null, 4));
}

function truncateReactRenderedOutput(tree: any): ReactExpectation {
    var exp = <ReactExpectation>{};
    // its expected that react elements will have 'key' and 'type' index
    exp.type = tree.type;
    exp.key = tree.key;
    if (tree.hasOwnProperty('children') && tree.children && !isEmpty(tree.children)) {
        if (typeof tree.children === 'string') {
            exp.children = tree.children;
        } else {
            exp.children = <ReactExpectation[]>[];
            for (var k in tree.children) {
                exp.children
            }
        }
    }
    return exp;
}

function isEmpty(value): boolean {
    return Boolean(value && typeof value == 'object') && !Object.keys(value).length;
};
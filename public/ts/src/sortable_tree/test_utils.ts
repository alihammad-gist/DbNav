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
    children?: ReactExpectation
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
    console.log(JSON.stringify(truncateReactRenderedOutput(tree), null, 4));
}

function truncateReactRenderedOutput(tree: any): ReactExpectation {
    var exp: ReactExpectation;
    for (var key in tree) {
        if (tree.hasOwnProperty(key)) {
            exp = { type: tree[key]['type'], key: tree[key]['key'] };
            if (tree[key].hasOwnProperty('_store')) {
                if (tree[key]['_store'].hasOwnProperty('props')) {
                    var p: ExpectationProps = tree[key]['_store']['props'];
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
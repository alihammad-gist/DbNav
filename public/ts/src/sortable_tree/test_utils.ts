///<reference path="../../typings/tsd.d.ts"/>

import React = require('react/addons');
import Tape = require('tape');

interface ReactExpectation {
    type: string
    props?: any[]
    children?: ReactExpectation
}

const TestUtils = React.addons.TestUtils;

export function checkReactTree(exp:ReactExpectation, el:React.ReactElement<any>, t: Tape.Test):boolean {

    return false;
}

export function convertReactElToReactExpectation(el:React.ReactElement<any>): ReactExpectation {
    const renderer = TestUtils.createRenderer();
    renderer.render(el);
    var tree = renderer.getRenderOutput(),
        exp: ReactExpectation;

}

function truncateReactRenderedOutput(tree: Array<string>): ReactExpectation {
    var exp: ReactExpectation;
    for(var key in tree) {
        if (tree.hasOwnProperty(key)) {
            switch (key) {
                case 'props':
                    if (tree['props'].hasOwnProperty('children')) {
                        exp.children = truncateReactRenderedOutput(tree['props']['children']);
                    }
            }
        }
    }
}
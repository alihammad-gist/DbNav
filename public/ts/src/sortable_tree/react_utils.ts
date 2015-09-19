///<reference path="../../typings/tsd.d.ts"/>

import React = require('react/addons');
import Tape = require('tape');

export type ExpectationProps = { [name: string]: any };
export type ReactRenderedProps = {
    children: ReactRenderedOutput[]| string
    [name: string]: any
};

export interface ElementExpectation {
    type: string
    ref?: string
    key?: string | number
    props?: ExpectationProps
    children?: ElementExpectation[]| string
};

export interface ReactRenderedOutput extends React.ReactElement<any> {
    type: string
    key: string | number
    ref: string
    _owner: any
    _context: any
    _store: {
        props: ReactRenderedProps
        originalProps: ReactRenderedProps
    }
};

export function convertToElementExpectation(r: ReactRenderedOutput): ElementExpectation {
    var exp = <ElementExpectation>{}

    exp.type = r.type
    exp.ref = r.ref
    exp.key = r.key
    var props = getNodeOfTree<ReactRenderedProps>(r, '_store', 'props')
    if (props) {
        var children = getNodeOfTree<Array<ReactRenderedOutput> | string>(props, 'children')
        if (children) {
            if (typeof children === 'string') {
                exp.children = children
            } else {
                exp.children = <ElementExpectation[]> new Array();
                for (var k in children) {
                    if (children.hasOwnProperty(k)) {
                        exp.children.push(
                            convertToElementExpectation(children[k])
                            );
                    }
                }
            }

        }
        delete props.children
        exp.props = props
    }

    return exp
}


/**
 * Checks if provided object is empty
 * @param  {Object}  value 
 * @return {boolean}      
 */
function isEmpty(value: Object): boolean {
    return Boolean(value && typeof value == 'object') && !Object.keys(value).length;
};

/**
 * Returns children of passed reactnode [renderedOutput of shadowRenderer]
 * pass in list of arguments after tree as index to be retreived
 * @param  {any}                tree Pass by value
 * @param  {string[]}           idx  Path to desired node     
 * @return {ReactExpectation[]}     
 */
function getNodeOfTree<T>(tree: any, ...idx: string[]): T {
    for (var i = 0; i < idx.length; i++) {
        if (!tree || !tree.hasOwnProperty(idx[i])) {
            return null
        }
        tree = tree[idx[i]];
    }
    return tree;
}
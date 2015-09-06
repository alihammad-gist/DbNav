///<reference path="tree.d.ts"/>
///<reference path="../../typings/tsd.d.ts"/>

import React = require('react');

type ReactElement = React.ReactElement<any>;

var DOM = React.DOM;

export function createUl(data: Tree.Data, props: Tree.TreeProps): ReactElement {
    var items: ReactElement[] = [];
    for(var i=0; i < data.length; i++) {
        var content_nodes: ReactElement[] = [];
        content_nodes.push(props.factory(data[i]));

        if (data[i].hasOwnProperty(props.children_hash)) {
            const nestedData = data[i][props.children_hash];
            if (typeof nestedData !== 'string' && typeof nestedData !== "number") {
                content_nodes.push(createUl(nestedData, props));
            }
        }

        items.push(
            createLi(i, content_nodes)
        );
    }

    return DOM.ul({}, items);
}

function createLi(key: Tree.ItemValue, el: ReactElement[]) {
    return DOM.li({key: key}, el);
}
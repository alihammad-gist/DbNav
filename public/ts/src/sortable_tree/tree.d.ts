///<reference path="../../typings/tsd.d.ts"/>

declare module Tree {
    import React = __React;

    type ItemValue = string | number;

    /**
     *  Expected "structure'
     *  [
     *      ['name'=>'..', 'label'=>'', 'pages'=>
     *          [
     *              ['name'=>'..', 'label'=>'..'],['name'=>'..', 'label'=>'..']
     *          ]
     *      ],
     *      ['name'=>'..']
     *  ];
     */
    interface Item {
        [key: string]: ItemValue | Data; // scalar ItemValue or Nested Data
    }

    type Data = Item[];

    interface ItemReactElementFactory {
        (data:Item): React.ReactElement<any>;
    }

    interface OnParentChange {
        (src_key:ItemValue, old_parent_key:ItemValue, new_parent_key:ItemValue): void
    }

    interface OnOrderChange {
        (src_key:ItemValue, old_idx:number, new_idx:number): void
    }

    interface TreeProps {
        data: Data;
        factory: ItemReactElementFactory;
        children_hash: string;
    }
}
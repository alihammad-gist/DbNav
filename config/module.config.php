<?php

return array(
    'router' => array(
        'routes' => array(
            'dbnav' => array(
                'type' => 'literal',
                'options' => array(
                    'route' => '/dbnav',
                    'defaults' => array(
                        'controller' => 'DbNav\Index',
                        'action' => 'index'
                    )
                )
            )
        )
    ),
    'view_manager' => array(
        'template_path_stack' => array(
            'db-nav' => __DIR__ . '/../view',
        )
    )
);

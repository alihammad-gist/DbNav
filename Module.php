<?php

/*
 * 
 * Copyright 2015 Ali Hammad
 */

namespace DbNav;

use DbNav\Controller\IndexController;
use DbNav\Db\Mysql\ContainerGateway;

class Module {

    public function getConfig() {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getServiceConfig() {
        return array(
            'factories' => array(
                'DbNav\Db\ContainerGateway' => function ($sm) {
                    return new ContainerGateway($sm->get('Zend\Db\Adapter\Adapter'));
                }
            )
        );
    }

    public function getControllerConfig() {
        return array(
            'factories' => array(
                'DbNav\Index' => function ($cm) {
                    $cg = $cm->getServiceLocator()->get('DbNav\Db\ContainerGateway');
                    return new IndexController($cg);
                }
            )
        );
    }

    public function getAutoloaderConfig() {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }

}

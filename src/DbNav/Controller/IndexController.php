<?php

namespace DbNav\Controller;

use DbNav\Db\ContainerGateway;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class IndexController extends AbstractActionController {

    /**
     * [$containerGateway description]
     * @var ContainerGateway
     */
    protected $containerGateway;

    public function __construct(ContainerGateway $cg) {
        $this->containerGateway = $cg;
    }

    public function indexAction() {
        // delete previous records

        $this->containerGateway->insert('gumsum');
        $this->containerGateway->insert('humdum');
        $this->containerGateway->delete(1);
        $this->containerGateway->delete(2);

        return new ViewModel(array(
            'rows' => $this->containerGateway->fetchAll(),
        ));
    }

}

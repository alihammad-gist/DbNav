<?php

namespace DbNav\Db\Mysql;

use Zend\Db\Adapter\Adapter;
use Zend\Db\Sql\Sql;

/**
 * Common dependencies of DbNav\Db interfaces
 *
 * @author Ali Hammad
 */
abstract class AbstractDb {
    
    /**
     *
     * @var Sql
     */
    protected $sql;

    public function __construct(Adapter $adapter) {
        $this->sql = new Sql($adapter);
    }
    
}

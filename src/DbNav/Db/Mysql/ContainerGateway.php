<?php

namespace DbNav\Db\Mysql;

use DbNav\Db\ContainerGateway as ContainerGatewayInterface;
use DbNav\Db\Exception\ContainerDoesntExist;
use DbNav\Db\Exception\ContainerExists;
use DbNav\Db\Exception\InternalError;
use Exception;

/**
 * Mysql Implementation of ContainerGateway
 *
 * @author Abc
 */
class ContainerGateway extends AbstractDb implements ContainerGatewayInterface {

    CONST TABLENAME = 'dbnav_containers';

    /**
     * Checks if container with provided credentials exists
     * @param type $id
     * @param type $container_name
     * @return boolean
     * @throws Exception
     * @throws InternalError
     */
    protected function exists($id = null, $container_name = null) {
        $sel = $this->sql->select(ContainerGateway::TABLENAME);
        $sel->columns(array('container_name'));

        if ($container_name) {
            $sel->where(array('container_name' => $container_name));
        } elseif ($id) {
            $sel->where(array('id' => $id));
        } else {
            throw new Exception('Atleast provide id or container_name');
        }
        $sel->limit(1);

        try {
            $stmt = $this->sql->prepareStatementForSqlObject($sel);
            $res  = $stmt->execute();
            if ($res->count() > 0) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $ex) {
            throw new InternalError($ex->getMessage());
        }
    }

    public function fetchAll() {
        $sel  = $this->sql->select(ContainerGateway::TABLENAME);
        $sel->order('id ASC');
        $rows = array();

        try {
            $stmt = $this->sql->prepareStatementForSqlObject($sel);
            $res  = $stmt->execute();
            foreach ($res as $row) {
                $rows[] = $row;
            }
        } catch (Exception $exc) {
            throw new InternalError($exc->getMessage());
        }

        return $rows;
    }

    public function insert($container_name) {
        if ($this->exists(null, $container_name)) {
            throw new ContainerExists("Container with the name $container_name already exists");
        }
        $ins = $this->sql->insert(ContainerGateway::TABLENAME);
        $ins->columns(array('container_name'));
        $ins->values(array('container_name' => $container_name));

        try {
            $stmt = $this->sql->prepareStatementForSqlObject($ins);
            $stmt->execute();
        } catch (Exception $exc) {
            throw new InternalError($exc->getMessage());
        }
    }

    public function update($id, $container_name) {
        if (!$this->exists($id)) {
            throw new ContainerDoesntExist("Container with id=$id doesn't exist");
        }

        $upd = $this->sql->update(ContainerGateway::TABLENAME);
        $upd->set(array(
            'container_name' => $container_name
        ));
        $upd->where(array('id' => $id));

        try {
            $stmt = $this->sql->prepareStatementForSqlObject($upd);
            $stmt->execute();
        } catch (Exception $ex) {
            throw new InternalError($ex->getMessage());
        }
    }

    public function delete($id) {
        if (!$this->exists($id, null)) {
            throw new ContainerDoesntExist("Container with the id = $id doesn't exist");
        }
        
        $del = $this->sql->delete(ContainerGateway::TABLENAME);
        $del->where(array(
            'id' => $id,
        ));
        try {
            $stmt = $this->sql->prepareStatementForSqlObject($del);
            $stmt->execute();
        } catch (Exception $ex) {
            throw new InternalError($ex->getMessage());
        }
    }

}

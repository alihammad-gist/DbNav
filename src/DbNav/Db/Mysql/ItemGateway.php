<?php

namespace DbNav\Db\Mysql;

use DbNav\Db\Exception\InternalError;
use DbNav\Db\Exception\ItemDoesntExist;
use DbNav\Db\ItemGateway as ItemGatewayInterface;
use Exception;

class ItemGateway extends AbstractDb implements ItemGatewayInterface {

    CONST TABLENAME = 'dbnav_items';

    protected function exists($id) {
        $sel = $this->sql->select(ItemGateway::TABLENAME);
        $sel->columns('id')
                ->where(array('id' => $id));
        try {
            $stmt = $this->sql->prepareStatementForSqlObject($sel);
            $res  = $stmt->execute();
            if (count($res) > 0) {
                return true;
            } else {
                return false;
            }
        } catch (Exception $ex) {
            throw new InternalError($ex->getMessage());
        }
    }

    public function delete($id) {
        if (!$this->exists($id)) {
            throw new ItemDoesntExist("Item with the id=$id doesn't exist");
        }

        $del = $this->sql->delete(ItemGateway::TABLENAME);
        $del->where(array('id' => $id));

        try {
            $stmt = $this->sql->prepareStatementForSqlObject($del);
            $stmt->execute();
        } catch (Exception $ex) {
            throw new InternalError($ex->getMessage());
        }
    }

    public function fetchAll($container_id) {
        $sel = $this->sql->select(ItemGateway::TABLENAME);
        $sel->where(array('container_id' => $container_id));

        $rows = array();
        try {
            $stmt = $this->sql->prepareStatementForSqlObject($sel);
            $res  = $stmt->execute();
            foreach ($res as $row) {
                $rows[$row['id']] = $row;
            }
        } catch (Exception $ex) {
            throw new InternalError($ex->getMessage());
        }

        return $rows;
    }

    public function insert($container_id, $route, $label) {
        $ins = $this->sql->insert(ItemGateway::TABLENAME);
        $ins->values(array(
            'container_id' => $container_id,
            'route' => $route,
            'label' => $label,
        ));

        try {
            $stmt = $this->sql->prepareStatementForSqlObject($ins);
            $res  = $stmt->execute();
            if ($res->getAffectedRows() === 0) {
                throw new Exception('Couldn\'t verify nav-item insert');
            }
        } catch (Exception $ex) {
            throw new InternalError($ex->getMessage());
        }
    }

    public function update($id, $route, $label) {
        if (!$this->exists($id)) {
            throw new ItemDoesntExist("Item with id=$id doesn't exist");
        }

        $upd = $this->sql->update(ItemGateway::TABLENAME);
        $upd->where(array('id' => $id))
                ->set(array(
                    'route' => $route,
                    'label' => $label,
        ));
        
        try {
            $stmt = $this->sql->prepareStatementForSqlObject($upd);
            $res = $stmt->execute();
            if ($res->getAffectedRows() === 0) {
                throw new Exception('Couldn\'t verfy nav-item update');
            }
        } catch (Exception $ex) {
            throw new InternalError($ex->getMessage());
        }
    }

}

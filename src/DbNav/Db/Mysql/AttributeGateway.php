<?php

namespace DbNav\Db\Mysql;

use DbNav\Db\AttributeGateway as AttributeGatewayInterface;
use DbNav\Db\Exception\AttributeDoesntExist;
use DbNav\Db\Exception\AttributeExists;
use DbNav\Db\Exception\InternalError;
use Exception;

/**
 * Check DbNav\Db\AttributeGateway interface for docblock comments
 */
class AttributeGateway extends AbstractDb implements AttributeGatewayInterface {

    CONST TABLENAME = 'dbnav_attribs';

    protected function exists($id, $item_id = null, $type = null, $name = null) {
        $sel = $this->sql->select(self::TABLENAME);
        $sel->limit(1);
        if ($id) {
            $sel->where(array(
                'id' => $id,
            ));
        } else if ($item_id && $type && $name) {
            $sel->where(array(
                'item_id' => $item_id,
                'type' => $type,
                'name' => $name,
            ));
        } else {
            throw new Exception(__METHOD__ . ' - Atleast provide id or item_id, type, name');
        }

        try {
            $stmt = $this->sql->prepareStatementForSqlObject($sel);
            $res  = $stmt->execute();
            if (count($res) === 1) {
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
            throw new AttributeDoesntExist("Attribute with id=$id doesn't exist");
        }

        $del = $this->sql->delete(self::TABLENAME);
        $del->where(array('id' => $id));

        try {
            $stmt = $this->sql->prepareStatementForSqlObject($del);
            $res  = $stmt->execute();
            if ($res->getAffectedRows() === 0) {
                throw new Exception('Cannot verify attribute insertion');
            }
        } catch (Exception $ex) {
            throw new InternalError($ex->getMessage());
        }
    }

    public function fetchAll($item_id, $type = null) {
        $sel = $this->sql->select(self::TABLENAME);
        $sel->where(array(
            'item_id' => $item_id,
        ));
        if ($type) {
            $sel->where(array('attrib_type' => $type));
        }

        $rows = array();
        try {
            $stmt = $this->sql->prepareStatementForSqlObject($sel);
            $res  = $stmt->execute();
            foreach ($res as $row) {
                $rows[$row['attrib_type']][] = $row;
            }
        } catch (Exception $ex) {
            throw new InternalError($ex->getMessage());
        }

        return $rows;
    }

    public function insert($item_id, $type, $name, $value) {
        if ($this->exists(null, $item_id, $type, $name)) {
            throw new AttributeExists("Attribute with item_id=$item_id, type=$type, name=$name exisits");
        }

        $ins = $this->sql->insert(self::TABLENAME);
        $ins->values(array(
            'item_id' => $item_id,
            'attrib_type' => $type,
            'attrib_name' => $name,
            'attrib_value' => $value,
        ));

        try {
            $stmt = $this->sql->prepareStatementForSqlObject($ins);
            $res  = $stmt->execute();
            if ($res->getAffectedRows() === 0) {
                throw new Exception('Cannot verify attribute insertion');
            } else {
                return $res->getGeneratedValue();
            }
        } catch (Exception $ex) {
            throw new InternalError($ex->getMessage());
        }
    }

    public function update($id, $item_id, $type, $name, $value) {
        if (!$this->exists($id)) {
            throw new AttributeDoesntExist("Attribute with id=$id doesn't exist");
        } elseif ($this->exists(null, $item_id, $type, $name)) {
            throw new AttributeExists("Attribute already exists with unique item_id=$item_id, type=$type, name=$name");
        }

        $upd = $this->sql->update(self::TABLENAME);
        $upd->where(array(
            'id' => $id,
        ))->set(array(
            'item_id' => $item_id,
            'attrib_type' => $type,
            'attrib_name' => $name,
            'attrib_value' => $value,
        ));
        
        try {
            $stmt = $this->sql->prepareStatementForSqlObject($upd);
            $res = $stmt->execute();
            if ($res->getAffectedRows() === 0) {
                throw new \Exception('Cannot verify attribute update');
            }
        } catch (Exception $ex) {
            throw new InternalError($ex->getMessage());
        }
    }

}

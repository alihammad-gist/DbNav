<?php

namespace DbNav\Db;

interface AttributeGateway {
    public function insert($item_id, $type, $name, $value);
    
    /**
     * Fetches attributes for provided item_id and type.
     * Return array should be in the format
     * array(
     *  TYPE => attributes_array
     * )
     * 
     * @param mixed $item_id
     * @param integer $type
     * @return array 
     */
    public function fetchAll($item_id, $type = null);
    public function update($id, $item_id, $type, $name, $value);
    public function delete($id);
}

<?php

namespace DbNav\Db;

interface ItemGateway {
    /**
     * Add items inside the container with the provided $container_id
     * @param mixed $container_id
     * @param string $route
     * @param string $label
     * @throws Exception\InternalError
     */
    public function insert($container_id, $route, $label);
    
    /**
     * Fetches all the Nav items from the container with $container_id
     * @param mixed $container_id
     * @return array Hash of navitems $arr[id] => itemArray
     * @throws Exception\InternalError
     */
    public function fetchAll($container_id);
    
    /**
     * Updates the navitem that has the provided $id
     * @param mixed $id
     * @param string $route
     * @param string $label
     * @throws Exception\ItemDoesntExist
     * @throws Exception\InternalError
     */
    public function update($id, $route, $label);
    
    /**
     * Deletes the item that has the provided $id
     * @param type $id
     * @throws Exception\ItemDoesntExist
     * @throws Exception\InternalError
     */
    public function delete($id);
}

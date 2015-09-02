<?php

namespace DbNav\Db;

interface ContainerGateway {

    /**
     * Fetches the list inserted containers
     * @return array
     * @throws Exception\InternalError
     */
    public function fetchAll();

    /**
     * Inserts a new container
     * @param string $container_name
     * @return void 
     * @throws Exception\ContainerExists
     * @throws Exception\InternalError
     */
    public function insert($container_name);

    /**
     * Updates container's name
     * @param int $id Container's id whose name should be updated
     * @param string $container_name
     * @throws Exception\ContainerDoesntExist
     * @throws Exception\InternalError
     */
    public function update($id, $container_name);
    
    /**
     * Deletes container with the provided container_name
     * @param integer $id
     */
    public function delete($id);
}

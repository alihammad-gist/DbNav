CREATE TABLE dbnav_containers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    container_name VARCHAR(255) NOT NULL,
    UNIQUE (container_name)
) ENGINE=InnoDb;

CREATE TABLE dbnav_items (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    container_id INT NOT NULL,
    route VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,
    parent_id INT NOT NULL,
    FOREIGN KEY (container_id) REFERENCES dbnav_containers(id),
    FOREIGN KEY (parent_id) REFERENCES dbnav_items(id)
) ENGINE=Innodb;

CREATE TABLE dbnav_item_attribs (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    item_id INT NOT NULL,
    attrib_type INT NOT NULL,
    attrib_name VARCHAR(255) NOT NULL,
    attrib_value VARCHAR(255),
    FOREIGN KEY (item_id) REFERENCES dbnav_items(id)
)
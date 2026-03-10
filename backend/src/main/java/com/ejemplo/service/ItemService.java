package com.ejemplo.service;

import com.ejemplo.model.Item;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ItemService {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final File dataFile;

    public ItemService(@Value("${items.file.path}") String filePath) {
        this.dataFile = new File(filePath);
    }

    public List<Item> getAllItems() throws IOException {
        if (!dataFile.exists() || dataFile.length() == 0) {
            return new ArrayList<>();
        }
        return objectMapper.readValue(dataFile, new TypeReference<List<Item>>() {});
    }

    public Item addItem(Item item) throws IOException {
        List<Item> items = getAllItems();

        // Auto-generate the next id
        long nextId = items.stream()
                .mapToLong(Item::getId)
                .max()
                .orElse(0) + 1;
        item.setId(nextId);

        items.add(item);
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(dataFile, items);
        return item;
    }
}

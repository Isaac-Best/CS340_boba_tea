-- Get all store information to display on Stores page
SELECT store_id, location, franchise 
FROM Stores;

-- Get all inventory information to display on Inventory page
SELECT inventory_id, store_id, milk_amount, tea_amount, boba_amount 
FROM Inventory;

-- Get all menu item information to display on Menu Items page
SELECT menu_item_id, item_name, inventory_id 
FROM MenuItems;

-- Add a new store
INSERT INTO Stores (location, franchise) VALUES 
    (:locationInput, :franchiseInput);
    
-- Add a new inventory item
INSERT INTO Inventory (store_id, milk_amount, tea_amount, boba_amount) VALUES 
    (:storeIDInput, :milkAmountInput, :teaAmountInput, :bobaAmountInput);
    
-- Add a new menu item
INSERT INTO MenuItems (item_name, inventory_id) VALUES 
    (:itemNameInput, :inventoryIDInput);
    
-- Update store location
UPDATE Stores SET location = :newLocation WHERE store_id = :storeIDToUpdate;
    
-- Update store franchise owner
UPDATE Stores SET franchise = :newFranchiseOwner WHERE store_id = :storeIDToUpdate;
    
-- Update inventory milk amount
UPDATE Inventory SET milk_amount = :newMilkAmount WHERE inventory_id = :inventoryIDToUpdate;
    
-- Update inventory tea amount
UPDATE Inventory SET tea_amount = :newTeaAmount WHERE inventory_id = :inventoryIDToUpdate;
    
-- Update inventory boba amount
UPDATE Inventory SET boba_amount = :newBobaAmount WHERE inventory_id = :inventoryIDToUpdate;
    
-- Update menu item name
UPDATE MenuItems SET item_name = :newItemName WHERE menu_item_id = :menuItemIDToUpdate;
    
-- Update menu item inventory
UPDATE MenuItems SET inventory_id = :newInventoryID WHERE menu_item_id = :menuItemIDToUpdate;
    
-- Delete store from database
DELETE FROM Stores WHERE store_id = :storeIDToDelete;
    
-- Delete inventory item from database
DELETE FROM Inventory WHERE inventory_id = :inventoryIDToDelete;
    
-- Delete menu item from database
DELETE FROM MenuItems WHERE menu_item_id = :menuItemIDToDelete;

-- Get all orders to display on Orders page
SELECT order_id, customer_name, order_date, order_time, item_name, quantity, total_amount
FROM Orders;

-- Get order information by ID
SELECT order_id, customer_name, order_date, order_time, item_name, quantity, total_amount
FROM Orders
WHERE order_id = :orderID;

-- Add a new order
INSERT INTO Orders (customer_name, order_date, order_time, item_name, quantity, total_amount) VALUES
(:customerNameInput, :orderDateInput, :orderTimeInput, :itemNameInput, :quantityInput, :totalAmountInput);

-- Update order customer name
UPDATE Orders SET customer_name = :newCustomerName WHERE order_id = :orderIDToUpdate;

-- Update order date
UPDATE Orders SET order_date = :newOrderDate WHERE order_id = :orderIDToUpdate;

-- Update order time
UPDATE Orders SET order_time = :newOrderTime WHERE order_id = :orderIDToUpdate;

-- Update order menu item
UPDATE Orders SET item_name = :newItemName WHERE order_id = :orderIDToUpdate;

-- Update order quantity
UPDATE Orders SET quantity = :newQuantity WHERE order_id = :orderIDToUpdate;

-- Update order total amount
UPDATE Orders SET total_amount = :newTotalAmount WHERE order_id = :orderIDToUpdate;

-- Delete order from database
DELETE FROM Orders WHERE order_id = :orderIDToDelete;
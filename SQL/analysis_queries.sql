-- NYC Taxi Analytics Queries

-- 1. Total Trips
SELECT COUNT(*) AS total_trips
FROM nyc_taxi_data;

-- 2. Average Fare
SELECT AVG(fare_amount) AS avg_fare
FROM nyc_taxi_data;

-- 3. Total Revenue
SELECT SUM(fare_amount) AS total_revenue
FROM nyc_taxi_data;

-- 4. Trips per Hour (Peak Analysis)
SELECT 
    EXTRACT(HOUR FROM tpep_pickup_datetime) AS hour,
    COUNT(*) AS trip_count
FROM nyc_taxi_data
GROUP BY hour
ORDER BY trip_count DESC;

-- 5. Average Trip Distance by Passenger Count
SELECT 
    passenger_count,
    AVG(trip_distance) AS avg_distance
FROM nyc_taxi_data
GROUP BY passenger_count
ORDER BY passenger_count;

-- 6. Revenue by Passenger Count
SELECT 
    passenger_count,
    SUM(fare_amount) AS revenue
FROM nyc_taxi_data
GROUP BY passenger_count
ORDER BY revenue DESC;

-- 7. Longest Trips
SELECT 
    trip_distance,
    fare_amount
FROM nyc_taxi_data
ORDER BY trip_distance DESC
LIMIT 10;

-- 8. Most Common Pickup Hours
SELECT 
    EXTRACT(HOUR FROM tpep_pickup_datetime) AS hour,
    COUNT(*) AS frequency
FROM nyc_taxi_data
GROUP BY hour
ORDER BY frequency DESC
LIMIT 5;

-- 9. Fare vs Distance Relationship
SELECT 
    trip_distance,
    AVG(fare_amount) AS avg_fare
FROM nyc_taxi_data
GROUP BY trip_distance
ORDER BY trip_distance;

-- 10. Daily Trip Count
SELECT 
    DATE(tpep_pickup_datetime) AS trip_date,
    COUNT(*) AS trips
FROM nyc_taxi_data
GROUP BY trip_date
ORDER BY trip_date;
CREATE VIEW daily_trip_volume AS
SELECT 
DATE(pickup_datetime) AS day,
COUNT(*) AS trips
FROM trips
GROUP BY day;

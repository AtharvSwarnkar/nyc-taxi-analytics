from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# GET ABSOLUTE PATH (VERY IMPORTANT)
# -----------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA_PATH = os.path.join(BASE_DIR, "data", "nyc_taxi_data.csv")

# -----------------------------
# LOAD DATA
# -----------------------------
df = pd.read_csv(DATA_PATH)

# Process datetime
df["tpep_pickup_datetime"] = pd.to_datetime(df["tpep_pickup_datetime"])
df["hour"] = df["tpep_pickup_datetime"].dt.hour

# -----------------------------
# API ROUTES
# -----------------------------

@app.get("/")
def home():
    return {"message": "NYC Taxi Backend Running"}

@app.get("/summary")
def get_summary():
    return {
        "total_trips": int(len(df)),
        "avg_fare": float(df["fare_amount"].mean()),
        "total_revenue": float(df["fare_amount"].sum()),
        "avg_passengers": float(df["passenger_count"].mean())
    }

@app.get("/trips_by_hour")
def trips_by_hour():
    data = df.groupby("hour").size().reset_index(name="trips")
    return data.to_dict(orient="records")

@app.get("/fare_vs_distance")
def fare_vs_distance():
    sample = df.sample(2000)
    return sample[["trip_distance", "fare_amount"]].to_dict(orient="records")


@app.get("/revenue_by_hour")
def revenue_by_hour():
    data = df.groupby("hour")["fare_amount"].sum().reset_index(name="revenue")
    return data.to_dict(orient="records")


@app.get("/avg_fare_by_hour")
def avg_fare_by_hour():
    data = df.groupby("hour")["fare_amount"].mean().reset_index(name="avg_fare")
    return data.to_dict(orient="records")


@app.get("/passenger_distribution")
def passenger_distribution():
    data = df["passenger_count"].value_counts().reset_index()
    data.columns = ["passenger_count", "count"]
    return data.to_dict(orient="records")


@app.get("/trip_distance_distribution")
def trip_distance_distribution():
    sample = df.sample(5000)
    return sample["trip_distance"].to_list()


@app.get("/revenue_by_passenger")
def revenue_by_passenger():
    data = df.groupby("passenger_count")["fare_amount"].sum().reset_index(name="revenue")
    return data.to_dict(orient="records")


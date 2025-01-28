from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route("/price", methods=["GET"])
def get_price():
    symbol = request.args.get("symbol")
    if not symbol:
        return jsonify({"error": "No symbol provided"}), 400

    try:
        if symbol.upper() in ["BTC", "ETH"]:  # Crypto example
            response = requests.get(f"https://api.coingecko.com/api/v3/simple/price?ids={symbol.lower()}&vs_currencies=usd")
            price = response.json()[symbol.lower()]["usd"]
        else:  # Stock example
            response = requests.get(f"https://query1.finance.yahoo.com/v7/finance/quote?symbols={symbol}")
            price = response.json()["quoteResponse"]["result"][0]["regularMarketPrice"]

        return jsonify({"symbol": symbol.upper(), "price": price})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

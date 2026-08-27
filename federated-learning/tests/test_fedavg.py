from server.flower_server import FedAvgAggregator

def test_fedavg_aggregation():
    aggregator = FedAvgAggregator()
    initial_round = aggregator.current_round

    mock_updates = [
        {"num_samples": 1000, "loss": 0.300, "f1": 90.0},
        {"num_samples": 2000, "loss": 0.240, "f1": 93.0},
    ]

    result = aggregator.aggregate(mock_updates)

    assert result["round"] == initial_round + 1
    assert result["global_loss"] == 0.260  # (1000*0.3 + 2000*0.24)/3000 = 0.78/3 = 0.26
    assert result["global_f1"] == 92.0    # (1000*90 + 2000*93)/3000 = 276/3 = 92.0
    assert result["zero_egress_confirmed"] is True

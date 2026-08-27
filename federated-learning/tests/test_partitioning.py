from partitioning.partition_data import generate_non_iid_partitions

def test_dirichlet_partition_reproducibility():
    p1 = generate_non_iid_partitions(seed=42)
    p2 = generate_non_iid_partitions(seed=42)

    assert p1 == p2
    assert len(p1) == 3

    total_allocated = sum(data["sample_count"] for data in p1.values())
    assert 55400 <= total_allocated <= 55500

    for name, data in p1.items():
        assert data["zero_egress_enforced"] is True
        assert sum(data["proportions"].values()) == 1.0

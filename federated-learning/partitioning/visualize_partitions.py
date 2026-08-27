"""
Dirichlet Non-IID Skew Visualizer and Matrix Generator
"""

import json
from partitioning.partition_data import generate_non_iid_partitions

def print_partition_matrix():
    partitions = generate_non_iid_partitions()
    print("=" * 60)
    print(" FedClinNLP Non-IID Dirichlet Partition Matrix (alpha=0.5)")
    print("=" * 60)

    for name, data in partitions.items():
        print(f"\nNode: {name} (Samples: {data['sample_count']:,})")
        for specialty, ratio in data["proportions"].items():
            bar = "█" * int(ratio * 30)
            print(f"  {specialty:<18}: {bar:<30} {ratio * 100:>5.1f}%")

    print("\n" + "=" * 60)

if __name__ == "__main__":
    print_partition_matrix()

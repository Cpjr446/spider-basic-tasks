class BankersAlgorithm:
    def __init__(self, processes, available, max_claim, allocation):
        self.processes = processes
        self.available = available
        self.max_claim = max_claim
        self.allocation = allocation
        self.need = [[self.max_claim[i][j] - self.allocation[i][j] for j in range(len(self.available))] for i in range(len(self.processes))]

    def is_safe(self):
        work = self.available[:]
        finish = [False] * len(self.processes)
        safe_sequence = []

        while len(safe_sequence) < len(self.processes):
            allocated = False
            for i, process in enumerate(self.processes):
                if not finish[i] and all(self.need[i][j] <= work[j] for j in range(len(work))):
                    for j in range(len(work)):
                        work[j] += self.allocation[i][j]
                    finish[i] = True
                    safe_sequence.append(process)
                    allocated = True

            if not allocated:
                break

        if len(safe_sequence) == len(self.processes):
            print("The system is in a safe state.")
            print("Safe sequence:", safe_sequence)
            return True
        else:
            print("The system is not in a safe state.")
            return False

# Example usage
processes = ['P0', 'P1', 'P2', 'P3', 'P4']
available = [3, 3, 2]  # Initial available resources
max_claim = [
    [7, 5, 3],
    [3, 2, 2],
    [9, 0, 2],
    [2, 2, 2],
    [4, 3, 3]
]  # Maximum resources needed by each process
allocation = [
    [0, 1, 0],
    [2, 0, 0],
    [3, 0, 2],
    [2, 1, 1],
    [0, 0, 2]
]  # Resources currently allocated to each process

bankers = BankersAlgorithm(processes, available, max_claim, allocation)
bankers.is_safe()

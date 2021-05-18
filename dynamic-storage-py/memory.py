
def first_fit(blockSize, m, processSize, n):
    block_id = [-1] * n 

    print("Programa  Tamaño      Bloque       Tamaño")

    for i in range(n):
        for j in range(m):
            if blockSize[j] >= processSize[i]:
                block_id[i] = j 
                blockSize[j] -= processSize[i] 
                break
        
        if block_id[i] != -1: 
            print(f'{i+1}          {processSize[i]}         {block_id[i] + 1}            {blockSize[block_id[i]]}')
        else:
            print(f'{i+1}          {processSize[i]}         Sin cupo')


def best_fit(blockSize, m, processSize, n):
    block_id = [-1] * n 

    print("Programa  Tamaño      Bloque       Tamaño")
    for i in range(n):
        bestIdx = -1
        for j in range(m):
            if blockSize[j] >= processSize[i]:
                if bestIdx == -1: 
                    bestIdx = j 
                elif blockSize[bestIdx] > blockSize[j]: 
                    bestIdx = j
  
        # mejor bloque
        if bestIdx != -1:
            block_id[i] = bestIdx 
            blockSize[bestIdx] -= processSize[i]
        
        if block_id[i] != -1: 
            print(f'{i+1}          {processSize[i]}         {block_id[i] + 1}            {blockSize[block_id[i]]}')
        else:
            print(f'{i+1}          {processSize[i]}         Sin cupo')


def best_fit_extended(blockSize, m, processSize, n):
    block_id = [-1] * n 

    print("Programa  Tamaño      Bloque       Tamaño")
    for i in range(n):
        bestIdx = -1
        for j in range(m):
            if blockSize[j] >= processSize[i]:
                if bestIdx == -1: 
                    bestIdx = j 
                elif blockSize[bestIdx] > blockSize[j]: 
                    bestIdx = j
  
        if bestIdx != -1:
              
            # allocate block j to p[i] process 
            block_id[i] = bestIdx 
            blockSize[bestIdx] -= blockSize[bestIdx]
        
        if block_id[i] != -1: 
            print(f'{i+1}          {processSize[i]}         {block_id[i] + 1}            {blockSize[block_id[i]]}')
        else:
            print(f'{i+1}          {processSize[i]}         Sin cupo')
  

blockSize = []
blocks_num = int(input('bloques: '))
for i in range(blocks_num):
    n = int(input('tamano: '))
    blockSize.append(n) 

processSize = []
process_num = int(input('programas: '))
for i in range(process_num):
    n = int(input('tamano: '))
    processSize.append(n) 

m = len(blockSize)
n = len(processSize)

option = int(input('metodo: '))
if option == 1:
    first_fit(blockSize, m, processSize, n)
elif option == 2:
    best_fit(blockSize, m, processSize, n)
elif option == 3:
    best_fit_extended(blockSize, m, processSize, n)

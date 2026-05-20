Ellen Lopes De Souza

percebi que o hook fazia muita coisa parecida em pontos diferentes e isso deixava o código mais pesado do que precisava

o que eu fiz foi separar melhor as partes: a regra da tela ficou no hook, e a parte que simula os dados ficou no service. Também deixei as ações mais diretas no estado, sem ficar recarregando a lista inteira o tempo todo

usei useCallback nas funções principais para não criar tudo de novo em cada render e organizei o fluxo para criar, editar, apagar e alternar as tarefas de um jeito mais simples

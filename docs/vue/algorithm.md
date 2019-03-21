# DApp 开发指南（四）

## ——随机源打造新世界的基石，ETM 混沌排序与时间塔算法详解

人的一生充满了不确定性，如同世上没有两片完全相同的叶子，而生活就像一盒巧克力，你永远不知道你会得到什么。面对这样的不确定性，它带来了不安与惶恐，但是更带来了光和希望。正是因为有了不确定性，也就有了无穷多的可能性，这是一个人甚至整个人类发展的动力之一，未来有了变数也就有了希望，没有人会想要那个一成不变按部就班的世界。

世界的历史进程是由一个个不确定性的意外事件推动的。如果说量子力学的不确定性原理是一切因果论的终结者，那么随机源，就是代码世界一切公平的基础。对于 ETM 的每一个参与者而言，不存在某个全知全能的上帝来决定你的未来，所有的决定都由混沌排序机制来完成。这个机制或者说理念贯穿着整个 ETM 项目，在涉及公平与安全的众多环节都有它的影子。

## 随机之源

我们需要随机数，用来加密信息、处理纸牌游戏的发牌、天气预报的未知参数处理、航班调度等等。计算机想要生成真随机数，就需要依赖外部世界的随机性，使用额外的硬件设备测量某些随机的物理现象：如盖氏计量器将短时间内背景辐射列出，序列的随机性源于辐射的随机性。但是这一类随机数生成器存在需要外部设备、生成缓慢、搜集耗时、无法重现等缺陷。

计算机是确定性的。意思它的行为取决于预先编写的指令，所以程序中的随机数通常被称作伪随机数。但是伪随机数并不是假随机数，这里的「伪」是有规律的意思，就是计算机生成的伪随机数即是随机的又是有规律的。这些随机数通常是由随机种子根据一定的方法计算而得，即只要方法一定，随机种子一定，那么生产出来的随机数就是确定的，而区块链中使用的随机数必须能够复现，以达成共识。

## 混沌之源

「天地未形，笼罩一切，充满寰宇者，实为一相，今名之曰混沌。」这是古罗马诗人欧威德（Ovid）代表作《变形记》对混沌的描写，而中国古代边韶所著的《老子铭》中，也有「世之好道者触类而长之，以老子离合于混沌之气，与三光为始终」的描述。可见，「混沌」的概念在欧洲于中国古来有之，尽管含义不尽相同，哲理却非常相近。但是，在现代科学里，「混沌」即 Chaos 却是一个很不一样的概念。

在现代科学史中，真正的数学和物理学意义下的混沌理论，公认是由麻省理工学院的气象学家洛伦兹（Lorenz）提出的。是在一次气象模拟试验中，将一个小数点后六位的初始值做了四舍五入处理，仅输入了小数点后前三位数，与精确值不到千分之一的误差，最后的结果却大相径庭。而后提出了最为大众所熟知的「蝴蝶效应」比喻：巴西的一只蝴蝶扇动一下翅膀，可能会在得克萨斯州掀起一场龙卷风。

失之毫厘，谬以千里，初始条件微小的差别或改变，可能引发巨大无比的后期效应，这是混沌理论最根本的特征。

自从洛伦兹在气象预报研究中发现混沌现象以来，人们陆续发现在众多自然和社会变化中，而科学意义下的「混沌理论」，也在生物医学、信息隐藏、流体混合等方面找到了成功的应用。

## 混沌排序

计算机是确定性的。但确定性往往被拿来作为攻击目标之一，在区块链系统中，出块顺序必须是确定的，一旦掌握了这排序，或许就能锁定并攻击正式矿工，篡改区块信息。

在传统的区块链系统中，一旦选出了这一轮出块的正式矿工，他们的出块顺序也是固定的了。排序与名单暴露于全网，任何人都可以查看，能够被轻易锁定和攻击。

newList = F(height, list)

ETM 使用快速混沌排序解决这一问题。混沌动力系统中动力学行为对初值的极度敏感性。通俗地说，混沌就是指对初值极小的扰动可以导致映射结果极大的变化，因此在预测过程中会导致一种不确定性。这种不确定性正是我们需要的。混沌排序指正式矿工上传的顺序并非一开始就确定，而是共识层的设计规定一种算法，提取每一次成功上传区块中的某些信息作映射并进行多次迭代计算出下一名正式矿工的编号。因此只有在最后一刻才知道应该上传区块的正式矿工到身份。虽然这一信息任何人仍能查看，但是混沌排序让外界无法锁定和攻击正式矿工。同时混沌映射是确定性的，因此所有矿工都通过自己的计算得到完全一致的排序结果。系统的稳定性和安全性在去中心化的前提下得到了实现。

index = F(id, slot, limit (0~100))

![混沌排序](/images/algorithm.png)

## 基于混沌算法的随机源——时间塔

在生成随机数这件事情上，一个复杂系统中，独立个体的行为是可控的，而个体集合为一个群体后却变得无法控制。因此利用区块链特性，让公众参与到随机数到生成，由每一个参与者提供随机种子，由算法共识保证随机数的可靠与公平。

根据这个思路，我们设计了时间塔算法，依赖 ETM 的纳什均衡体系，通过一系列设计，使得单个输入参数的改变，无法保证最终输出结果向其期望的方向倾斜，从而得到一个去中心化的、可靠的随机随机源。

### 时间塔算法

**算法输入：**N 个 Hash 值、迭代次数 M、SHA 计算次数 X

**参数说明：**

1. N、M 和 X 是算法参数，通过调整 N、M 和 X 可以调节算法的时间复杂度；

2. X 是 SHA256 计算次数，为待定常量

**算法步骤：**

1. 记 N 个区块中第一个区块的 Hash 值为 H~0~

2. 计算 H~0~' = SHA256(H~0~)，重复计算，迭代 X 次，得到 Q~0~

   ```c++
   for(i=0; i<X; i++){
   	H0 = SHA256(H0);
   }
   Q0 = H0;
   ```

3. 将 Q~0~ 代入混沌算法，得到下一个被选出的区块的 index，K~1~ = Chaos(Q~0~, H, N)

4. 查找第 K~1~ 个区块的 Hash 值，记为 H~1~

5. H~1~ = H~0~ + H~1~

6. 对 H~1~ 进行 SHA256 计算，重复步骤 2～5，得到 Q~1~ ，并迭代 M 次

7. 对 Q~1~ 到 Q~M~ 求和，输出最后的随机值

 **核心特点：**

1. 利用迭代算法的特性，抑制并行计算的影响

2. 利用混沌算法的特性，并通过充分迭代，随机选择，降低后部区块由于时间推进而具备的信息优势

3. 能够通过对参数的调整，增减算法的时间复杂度，灵活适应不同频率的随机数需求

## 公平秩序

混沌排序不仅是混沌理论在 ETM 系统中最为基础的应用，它更赋予了整个系统一个基础种子，在此之上，将混沌理论运用到系统的各个环节。我们知道，在一个区块链系统中，算力的概率分布决定了系统的安全性，而这就需要以公平与秩序为基础，混沌排序解决了出块顺序这一难题，保证了内部公平。而在外部，混沌排序也将作为随机种子之一，提供给所有的 DApp 开发者，保障生态体系的公平，从根源上杜绝了作弊行为的发生。

同时，一个区块链系统如果没有一个可靠的随机源体系，那么 DApp 用户对应用没有绝对的控制权，开发者或者运营商仍能够通过各种手段，控制 DApp 内部资产（如游戏装备产出概率）、影响链上公平（如胜负判断）。ETM 基于混沌理论设计的时间塔算法，正是运用理论中的不确定性，打造了一个可靠的随机源体系，保证了系统内部的公平秩序。

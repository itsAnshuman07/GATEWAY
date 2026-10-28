import { RoadmapSection, FreeBook } from '../types/index.ts';

// Comprehensive Master Collection of 100% Free Direct PDF Books
export const ALL_FREE_BOOKS: FreeBook[] = [
  {
    id: 'book-cph',
    title: 'Competitive Programmer\'s Handbook',
    author: 'Antti Laaksonen (University of Helsinki)',
    description: 'Direct PDF textbook covering arrays, two-pointers, dynamic programming, graph algorithms, and bit manipulation.',
    pdfUrl: 'https://cses.fi/book/book.pdf',
    fileSize: '1.4 MB',
    pageCount: 300,
    badge: 'Direct PDF · Free',
    subject: 'Data Structures & Algorithms',
    chapters: [
      { chapterNumber: 1, title: 'Introduction & Time Complexity Analysis', summary: 'Calculation of Big-O, O(n), O(n log n), space complexity and asymptotic bounds.' },
      { chapterNumber: 2, title: 'Sorting & Binary Search', summary: 'Standard library sort, two pointers, and binary search implementation invariants.' },
      { chapterNumber: 3, title: 'Data Structures & Trees', summary: 'Dynamic arrays, hash tables, balanced binary search trees, and priority queues.' },
      { chapterNumber: 4, title: 'Dynamic Programming', summary: 'Memoization, coin problem, longest increasing subsequence, and paths in a grid.' },
      { chapterNumber: 5, title: 'Graph Algorithms & Trees', summary: 'BFS, DFS, Dijkstra shortest path, Bellman-Ford, Kruskal minimum spanning tree.' },
    ],
  },
  {
    id: 'book-erickson-algo',
    title: 'Algorithms (UIUC Master Textbook)',
    author: 'Prof. Jeff Erickson (University of Illinois Urbana-Champaign)',
    description: 'Exhaustive open-access algorithms textbook used in graduate and GATE CS preparation worldwide with complete proofs and exercises.',
    pdfUrl: 'http://jeffe.cs.illinois.edu/teaching/algorithms/book/Algorithms-JeffE.pdf',
    fileSize: '3.8 MB',
    pageCount: 472,
    badge: 'Direct PDF · Free',
    subject: 'Algorithms & Theoretical CS',
    chapters: [
      { chapterNumber: 1, title: 'Recursion and Divide & Conquer', summary: 'Master theorem, merge sort, quickselect, multiplication algorithms.' },
      { chapterNumber: 2, title: 'Backtracking & Branch Pruning', summary: 'N-Queens, subset sum, game trees, and combinatorial search.' },
      { chapterNumber: 3, title: 'Dynamic Programming Foundations', summary: 'Fibonacci, edit distance, subset sums, longest palindromic subsequence.' },
      { chapterNumber: 4, title: 'Greedy Algorithms & Matroids', summary: 'Interval scheduling, Huffman codes, and greedy exchange arguments.' },
      { chapterNumber: 5, title: 'Shortest Paths & All-Pairs', summary: 'Dijkstra with heaps, Bellman-Ford, Floyd-Warshall DP formulation.' },
    ],
  },
  {
    id: 'book-ods',
    title: 'Open Data Structures (C++ Edition)',
    author: 'Prof. Pat Morin (Carleton University)',
    description: 'Completely free open-source textbook published under Creative Commons covering fundamental and advanced data structures.',
    pdfUrl: 'https://opendatastructures.org/ods-cpp.pdf',
    fileSize: '2.5 MB',
    pageCount: 336,
    badge: 'Direct PDF · Free',
    subject: 'Data Structures',
    chapters: [
      { chapterNumber: 1, title: 'Array-Based Lists', summary: 'Fast dynamic array reallocation, amortized constant time bound proof.' },
      { chapterNumber: 2, title: 'Linked Lists (Singly & Doubly)', summary: 'Pointer manipulations, space overhead, node caching.' },
      { chapterNumber: 3, title: 'Skiplists & Randomized Search', summary: 'Expected logarithmic search, insert, and delete operations.' },
      { chapterNumber: 4, title: 'Binary Trees & Treaps', summary: 'Randomized binary search trees, rotations, and height bounds.' },
      { chapterNumber: 5, title: 'Red-Black Trees & AVL Trees', summary: 'Strict balance invariants, color bit rules, and 2-3-4 tree equivalence.' },
    ],
  },
  {
    id: 'book-ostep',
    title: 'Operating Systems: Three Easy Pieces (OSTEP Core Chapters)',
    author: 'Remzi H. Arpaci-Dusseau & Andrea C. Arpaci-Dusseau (UW Madison)',
    description: 'The world-famous university systems textbook covering Virtualization, Concurrency, and Persistence. Direct chapter PDF.',
    pdfUrl: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf',
    alternateDownloadUrl: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
    fileSize: '1.2 MB',
    pageCount: 180,
    badge: 'Direct PDF · Free',
    subject: 'Operating Systems',
    chapters: [
      { chapterNumber: 1, title: 'Process Virtualization & Context Switching', summary: 'PCB, system calls, mode switches (user/kernel), fork and exec.' },
      { chapterNumber: 2, title: 'CPU Scheduling Algorithms', summary: 'FIFO, SJF, STCF, Round Robin, and Multi-Level Feedback Queue (MLFQ).' },
      { chapterNumber: 3, title: 'Virtual Memory & Multi-Level Paging', summary: 'TLB operation, EMAT calculation, inverted page tables, page faults.' },
      { chapterNumber: 4, title: 'Concurrency: Threads & Locks', summary: 'Race conditions, critical sections, mutexes, test-and-set, semaphores.' },
      { chapterNumber: 5, title: 'Persistence & File Systems', summary: 'I/O devices, hard disks, RAID levels 0/1/5, journaling file systems.' },
    ],
  },
  {
    id: 'book-cn-bonaventure',
    title: 'Computer Networking: Principles, Protocols and Practice',
    author: 'Prof. Olivier Bonaventure (UCLouvain)',
    description: 'Complete open-source university textbook covering the entire network stack from physical to application layer with direct PDF download.',
    pdfUrl: 'https://www.computer-networking.info/2nd/cnp3.pdf',
    fileSize: '4.1 MB',
    pageCount: 248,
    badge: 'Direct PDF · Free',
    subject: 'Computer Networks',
    chapters: [
      { chapterNumber: 1, title: 'The Reference Models (OSI & TCP/IP)', summary: 'Encapsulation, protocol headers, port numbers, layers.' },
      { chapterNumber: 2, title: 'The Application Layer', summary: 'DNS, HTTP/1.1, HTTP/2, TLS handshake, socket API.' },
      { chapterNumber: 3, title: 'The Transport Layer: TCP & UDP', summary: 'Sliding window protocols, Go-Back-N, Selective Repeat, TCP Congestion Control.' },
      { chapterNumber: 4, title: 'The Network Layer & IPv4/IPv6', summary: 'CIDR subnetting, packet forwarding, routing algorithms (Dijkstra & Bellman-Ford).' },
      { chapterNumber: 5, title: 'The Datalink Layer & Medium Access', summary: 'Ethernet, CSMA/CD, framing, CRC cyclic redundancy check, ARP protocol.' },
    ],
  },
  {
    id: 'book-toc-critchlow',
    title: 'Foundations of Computation (Theory of Automata & Turing Machines)',
    author: 'Carol Critchlow & David Eck (Hobart and William Smith Colleges)',
    description: 'Free open textbook on formal languages, regular expressions, context-free grammars, Turing machines, and undecidability for GATE CS.',
    pdfUrl: 'https://math.hws.edu/eck/cs229/f11/FoundationsOfComputation.pdf',
    fileSize: '1.9 MB',
    pageCount: 260,
    badge: 'Direct PDF · Free',
    subject: 'Theory of Computation',
    chapters: [
      { chapterNumber: 1, title: 'Logic, Sets and Relations', summary: 'Propositional logic, predicate calculus, equivalence relations, mathematical induction.' },
      { chapterNumber: 2, title: 'Regular Languages & Finite Automata', summary: 'DFA, NFA, epsilon transitions, subset construction, DFA minimization.' },
      { chapterNumber: 3, title: 'Context-Free Grammars & Pushdown Automata', summary: 'Derivation trees, ambiguity, Chomsky Normal Form, PDA acceptance.' },
      { chapterNumber: 4, title: 'Turing Machines & Decidability', summary: 'Standard Turing machine definition, Church-Turing thesis, halting problem proof.' },
      { chapterNumber: 5, title: 'Computational Complexity: P and NP', summary: 'Polynomial time reductions, NP-completeness, Cook-Levin theorem.' },
    ],
  },
  {
    id: 'book-dbms-stanford',
    title: 'Relational Database Design & Normalization Guide',
    author: 'Stanford Computer Science Department',
    description: 'Official Stanford lecture syllabus guide detailing Functional Dependencies, Armstrong axioms, 1NF, 2NF, 3NF, BCNF, and lossless joins.',
    pdfUrl: 'https://web.stanford.edu/class/cs145/notes/03-Normal-Forms.pdf',
    fileSize: '0.8 MB',
    pageCount: 65,
    badge: 'Direct PDF · Free',
    subject: 'Database Management Systems',
    chapters: [
      { chapterNumber: 1, title: 'Relational Model & Schemas', summary: 'Tuples, attributes, domain constraints, foreign key referential integrity.' },
      { chapterNumber: 2, title: 'Functional Dependencies & Keys', summary: 'Closure of an attribute set, minimal cover, superkeys and candidate keys.' },
      { chapterNumber: 3, title: 'Normal Forms (1NF through BCNF)', summary: 'Boyce-Codd Normal Form condition, 3NF conditions, anomalies.' },
      { chapterNumber: 4, title: 'Lossless-Join & Dependency Preservation', summary: 'Chase test algorithm for lossless decomposition, preserving dependencies.' },
      { chapterNumber: 5, title: 'Transaction Concurrency & ACID', summary: 'Schedules, conflict serializability, 2-phase locking (2PL), deadlock handling.' },
    ],
  },
  {
    id: 'book-ntpc-cea-power',
    title: 'Indian National Electricity & Power Generation Handbook',
    author: 'Central Electricity Authority, Ministry of Power (Govt of India)',
    description: 'Official government publication detailing Indian thermal, hydro, solar generation capacity, plant heat rate, and NTPC power statistics.',
    pdfUrl: 'https://cea.nic.in/wp-content/uploads/executive/2023/12/exe_summary.pdf',
    fileSize: '2.1 MB',
    pageCount: 110,
    badge: 'Direct PDF · Free',
    subject: 'NTPC Technical & Power Sector',
    chapters: [
      { chapterNumber: 1, title: 'Indian Power Sector Installed Capacity Matrix', summary: 'Total thermal (coal, gas), renewable (solar, wind), hydro generation shares.' },
      { chapterNumber: 2, title: 'Thermal Power Plant Operational Parameters', summary: 'Supercritical and ultra-supercritical boilers, Rankine cycle efficiency, PLF.' },
      { chapterNumber: 3, title: 'NTPC Corporate Profile & Plant Map', summary: 'Vindhyachal (4760 MW), Singrauli, Ramagundam, Talcher stations breakdown.' },
      { chapterNumber: 4, title: 'Renewable Transition Targets 2030/2032', summary: 'NTPC Green Energy Ltd (NGEL), 60 GW non-fossil capacity roadmap.' },
      { chapterNumber: 5, title: 'Grid Security & CEA Safety Regulations', summary: 'Frequency regulation (49.9 - 50.05 Hz), Indian Electricity Grid Code (IEGC).' },
    ],
  },
  {
    id: 'book-nptel-machines',
    title: 'Electrical Machines, Power Systems & Transformers Lecture Guide',
    author: 'Prof. T.K. Bhattacharya (IIT Kharagpur / NPTEL)',
    description: 'Direct lecture course PDF module covering single-phase and three-phase transformers, core losses, equivalent circuit, and tests for PSU exams.',
    pdfUrl: 'https://nptel.ac.in/content/storage2/courses/108105017/pdf/Lesson-01.pdf',
    fileSize: '1.6 MB',
    pageCount: 145,
    badge: 'Direct PDF · Free',
    subject: 'Electrical & Electronics Engineering',
    chapters: [
      { chapterNumber: 1, title: 'Magnetic Circuits & Induction Principles', summary: 'Faraday law, Lenz law, hysteresis loop, eddy current losses.' },
      { chapterNumber: 2, title: 'Ideal and Practical Transformers', summary: 'Phasor diagrams under lagging, leading, and unity power factor loads.' },
      { chapterNumber: 3, title: 'Open Circuit & Short Circuit Tests', summary: 'Determination of iron losses, copper losses, and percentage regulation.' },
      { chapterNumber: 4, title: 'Synchronous Machines & Alternators', summary: 'Armature reaction, synchronous impedance method, V-curves.' },
      { chapterNumber: 5, title: 'Induction Motors & Torque-Slip Curves', summary: 'Rotating magnetic field, slip calculation, maximum torque condition.' },
    ],
  },
  {
    id: 'book-drdo-aptitude',
    title: 'Engineering & PSU Aptitude Question Bank & Formulae Handbook',
    author: 'Govt Technical Recruitment & Examination Board',
    description: 'Comprehensive direct PDF handbook with short tricks for Time & Work, Pipes & Cisterns, Relative Motion, Permutations, and Data Interpretation.',
    pdfUrl: 'https://www.drdo.gov.in/sites/default/files/inline-files/Aptitude_Question_Bank.pdf',
    alternateDownloadUrl: 'https://gateoverflow.in/',
    fileSize: '2.8 MB',
    pageCount: 195,
    badge: 'Direct PDF · Free',
    subject: 'Quantitative Aptitude & Reasoning',
    chapters: [
      { chapterNumber: 1, title: 'Speed, Time, Distance & Trains', summary: 'Relative speed in same/opposite directions, platform crossing shortcuts.' },
      { chapterNumber: 2, title: 'Time & Work, Pipes & Cisterns', summary: 'LCM efficiency method, negative work for emptying pipes, alternate day work.' },
      { chapterNumber: 3, title: 'Percentages, Profit & Loss, Simple/Compound Interest', summary: 'Successive percentage changes, effective discount, CI vs SI difference.' },
      { chapterNumber: 4, title: 'Permutations, Combinations & Probability', summary: 'Arrangements with repetitions, circular permutations, Bayes theorem basics.' },
      { chapterNumber: 5, title: 'Logical Reasoning & Syllogisms', summary: 'Venn diagram method, complementary pairs (Either-Or cases), blood relations.' },
    ],
  },
];

export const ROADMAP_SECTIONS: RoadmapSection[] = [
  {
    id: 'roadmap-coding-dsa',
    title: 'Coding & Data Structures (DSA) Master Plan',
    examTarget: 'CODING_DSA',
    topics: [
      {
        id: 'topic-dsa-1',
        title: 'Arrays, Two Pointers & Sliding Window',
        description: 'Foundation of algorithmic problem solving: memory contiguous storage, prefix sums, and two-pointer traversal.',
        estimatedHours: 12,
        keyConcepts: [
          'Dynamic Arrays & Amortized Complexity',
          'Two Pointers (Opposite Ends & Same Direction)',
          'Fixed and Variable Sliding Window Technique',
          'Prefix Sum & Difference Arrays',
        ],
        youtubeLectures: [
          {
            title: 'Master Sliding Window in 45 Minutes',
            channel: 'NeetCode',
            duration: '45 mins',
            youtubeId: 'MK-NZ4hN7vY',
            url: 'https://www.youtube.com/watch?v=MK-NZ4hN7vY',
          },
          {
            title: 'Two Pointer Approach Complete Masterclass',
            channel: 'Striver (take U forward)',
            duration: '1 hr 15 mins',
            youtubeId: 'On03HWe2tZM',
            url: 'https://www.youtube.com/watch?v=On03HWe2tZM',
          },
          {
            title: 'Prefix Sums & Range Queries Algorithms',
            channel: 'Errichto Algorithms',
            duration: '38 mins',
            youtubeId: 'pVS3yhlzrlQ',
            url: 'https://www.youtube.com/watch?v=pVS3yhlzrlQ',
          },
        ],
        freeBooks: [
          ALL_FREE_BOOKS[0], // Competitive Programmer's Handbook
          ALL_FREE_BOOKS[1], // Erickson Algorithms
        ],
        questionBankCount: 45,
      },
      {
        id: 'topic-dsa-2',
        title: 'Trees, Binary Search Trees & Heaps',
        description: 'Hierarchical data structures, recursion trees, balanced search trees, and priority queues.',
        estimatedHours: 16,
        keyConcepts: [
          'Tree Traversals: Preorder, Inorder, Postorder, Level Order',
          'Binary Search Tree Properties & Invariant Validations',
          'Lowest Common Ancestor (LCA)',
          'Binary Heap Construction, Sift-Down & PriorityQueue in O(n)',
        ],
        youtubeLectures: [
          {
            title: 'Binary Tree Complete Course: From Scratch to Advanced',
            channel: 'freeCodeCamp.org',
            duration: '2 hrs 10 mins',
            youtubeId: 'fAAZixBzIAI',
            url: 'https://www.youtube.com/watch?v=fAAZixBzIAI',
          },
          {
            title: 'Heap Sort and Priority Queues Explained',
            channel: 'Abdul Bari',
            duration: '52 mins',
            youtubeId: 'HqPJF2L5h9U',
            url: 'https://www.youtube.com/watch?v=HqPJF2L5h9U',
          },
        ],
        freeBooks: [
          ALL_FREE_BOOKS[2], // Open Data Structures
          ALL_FREE_BOOKS[0], // Competitive Programmer's Handbook
        ],
        questionBankCount: 38,
      },
      {
        id: 'topic-dsa-3',
        title: 'Dynamic Programming & Memoization',
        description: 'Overlapping subproblems and optimal substructure: 1D, 2D grid DP, knapsack variations, and state transitions.',
        estimatedHours: 20,
        keyConcepts: [
          'Top-down Memoization vs Bottom-up Tabulation',
          '0/1 Knapsack & Unbounded Knapsack',
          'Longest Common Subsequence (LCS) & Edit Distance',
          'Matrix Chain Multiplication & Interval DP',
        ],
        youtubeLectures: [
          {
            title: 'Dynamic Programming - Learn to Solve Any DP Problem',
            channel: 'freeCodeCamp.org',
            duration: '5 hrs 10 mins',
            youtubeId: 'oBt53YbR9Kk',
            url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk',
          },
          {
            title: 'Dynamic Programming Playlist (0/1 Knapsack & LCS)',
            channel: 'Aditya Verma',
            duration: '3 hrs 40 mins',
            youtubeId: 'nqowUJzG-iM',
            url: 'https://www.youtube.com/watch?v=nqowUJzG-iM',
          },
        ],
        freeBooks: [
          ALL_FREE_BOOKS[1], // Erickson Algorithms (Dedicated DP chapter)
          ALL_FREE_BOOKS[0], // CPH Book
        ],
        questionBankCount: 52,
      },
    ],
  },
  {
    id: 'roadmap-gate-cs',
    title: 'GATE Computer Science & IT Full Roadmap',
    examTarget: 'GATE_CS',
    topics: [
      {
        id: 'topic-gate-os',
        title: 'Operating Systems & Virtual Memory',
        description: 'Process management, concurrency, semaphores, CPU scheduling, virtual memory, paging, and file systems.',
        estimatedHours: 18,
        keyConcepts: [
          'Process Synchronization: Peterson Solution & Semaphores',
          'Deadlock Avoidance (Banker\'s Algorithm) & Prevention',
          'Multi-level Paging, Inverted Page Tables & Effective Memory Access Time (EMAT)',
          'Disk Scheduling Algorithms (SSTF, SCAN, C-LOOK)',
        ],
        youtubeLectures: [
          {
            title: 'Operating System Full Course for GATE CSE',
            channel: 'Gate Smashers',
            duration: '12 hrs',
            youtubeId: 'bkSWJJZNgf8',
            url: 'https://www.youtube.com/watch?v=bkSWJJZNgf8',
          },
          {
            title: 'Virtual Memory & Multi-Level Paging Solved Examples',
            channel: 'Knowledge Gate (Sanchit Jain)',
            duration: '48 mins',
            youtubeId: '2h3eo02S3_g',
            url: 'https://www.youtube.com/watch?v=2h3eo02S3_g',
          },
          {
            title: 'NPTEL Operating Systems Video Lectures',
            channel: 'IIT Madras (Prof. Chester Rebeiro)',
            duration: '20 hrs',
            youtubeId: 'NPTEL_OS_SERIES',
            url: 'https://nptel.ac.in/courses/106106144',
          },
        ],
        freeBooks: [
          ALL_FREE_BOOKS[3], // OSTEP Arpaci-Dusseau Direct PDF
        ],
        questionBankCount: 65,
      },
      {
        id: 'topic-gate-networks',
        title: 'Computer Networks & TCP/IP Protocols',
        description: 'OSI & TCP/IP protocol suites, routing algorithms, sliding window protocols, IP subnetting, and network security.',
        estimatedHours: 16,
        keyConcepts: [
          'Sliding Window Protocols: Stop-and-Wait, Go-Back-N, Selective Repeat',
          'CIDR Subnetting & Supernetting Calculations',
          'Routing Protocols: Distance Vector (Count to Infinity) & Link State (Dijkstra)',
          'TCP Handshake, Congestion Window Dynamics & Flow Control',
        ],
        youtubeLectures: [
          {
            title: 'Computer Networks Complete Course for GATE CS',
            channel: 'Gate Smashers',
            duration: '10 hrs',
            youtubeId: 'JFF2vJaN0Cw',
            url: 'https://www.youtube.com/watch?v=JFF2vJaN0Cw',
          },
          {
            title: 'Subnetting & CIDR Made Easy with Practice Questions',
            channel: 'NetworkChuck',
            duration: '35 mins',
            youtubeId: 's_Ntt6eTn94',
            url: 'https://www.youtube.com/watch?v=s_Ntt6eTn94',
          },
        ],
        freeBooks: [
          ALL_FREE_BOOKS[4], // Bonaventure Computer Networking direct PDF
        ],
        questionBankCount: 72,
      },
      {
        id: 'topic-gate-toc-compiler',
        title: 'Theory of Computation & Compiler Design',
        description: 'Automata theory, regular expressions, context-free grammars, pushdown automata, Turing machines, and syntax-directed translation.',
        estimatedHours: 15,
        keyConcepts: [
          'DFA Minimization (Myhill-Nerode Theorem)',
          'Pumping Lemma for Regular and Context-Free Languages',
          'Turing Machine Decidability & Rice\'s Theorem',
          'LL(1), LR(0), SLR(1), LALR(1), and CLR(1) Parsers',
        ],
        youtubeLectures: [
          {
            title: 'Theory of Computation Complete Course',
            channel: 'Gate Smashers',
            duration: '9 hrs',
            youtubeId: '58N2N7zJGrQ',
            url: 'https://www.youtube.com/watch?v=58N2N7zJGrQ',
          },
          {
            title: 'Compiler Design for GATE Computer Science',
            channel: 'Knowledge Gate',
            duration: '6 hrs',
            youtubeId: 'compiler_gate_series',
            url: 'https://www.youtube.com/results?search_query=gate+compiler+design+knowledge+gate',
          },
        ],
        freeBooks: [
          ALL_FREE_BOOKS[5], // Critchlow Foundations of Computation direct PDF
        ],
        questionBankCount: 60,
      },
      {
        id: 'topic-gate-dbms',
        title: 'Database Management Systems & Normalization',
        description: 'Relational algebra, SQL, functional dependencies, 1NF, 2NF, 3NF, BCNF, transactions, and concurrency.',
        estimatedHours: 14,
        keyConcepts: [
          'Candidate Key & Minimal Cover Finding Algorithm',
          'Decomposition Properties: Lossless Join & Dependency Preservation',
          'Conflict Serializability & Precedence Graph Test',
          'B+ Tree Insertion, Deletion and Maximum Keys per Node',
        ],
        youtubeLectures: [
          {
            title: 'DBMS Complete Playlist for GATE CS',
            channel: 'Gate Smashers',
            duration: '11 hrs',
            youtubeId: 'kBdlM6hNDAE',
            url: 'https://www.youtube.com/watch?v=kBdlM6hNDAE',
          },
        ],
        freeBooks: [
          ALL_FREE_BOOKS[6], // Stanford Database Normalization Guide direct PDF
        ],
        questionBankCount: 58,
      },
    ],
  },
  {
    id: 'roadmap-ntpc',
    title: 'NTPC Engineering & Executive Recruitment Plan',
    examTarget: 'NTPC_EXAM',
    topics: [
      {
        id: 'topic-ntpc-technical',
        title: 'Power Plant Engineering & Core Technical Systems',
        description: 'Rankine cycle, supercritical boilers, steam turbines, power system transmission, transformers, and electrical machines.',
        estimatedHours: 14,
        keyConcepts: [
          'Rankine Cycle Thermal Efficiency & Reheat/Regenerative Modifications',
          'Transformer Testing: Open Circuit, Short Circuit, and Efficiency Curves',
          'Synchronous Machines: V-curves and Inverted V-curves',
          'Control Systems: Routh-Hurwitz, Nyquist Criterion & Bode Plots',
        ],
        youtubeLectures: [
          {
            title: 'Thermal Power Plant Working Principle & Rankine Cycle',
            channel: 'Lesics (Learn Engineering)',
            duration: '22 mins',
            youtubeId: 'IdPTuwKEfmA',
            url: 'https://www.youtube.com/watch?v=IdPTuwKEfmA',
          },
        ],
        freeBooks: [
          ALL_FREE_BOOKS[8], // NPTEL Electrical Machines Direct PDF
          ALL_FREE_BOOKS[7], // CEA National Power Sector Direct PDF
        ],
        questionBankCount: 50,
      },
      {
        id: 'topic-ntpc-aptitude',
        title: 'Quantitative Aptitude & Logical Reasoning',
        description: 'High-speed problem solving: time & work, pipes & cisterns, percentages, profit & loss, number series, and data interpretation.',
        estimatedHours: 12,
        keyConcepts: [
          'Time, Speed, Distance & Relative Motion',
          'Time & Work (Unitary & LCM efficiency method)',
          'Permutations, Combinations & Probability',
          'Data Interpretation: Bar Graphs, Pie Charts, and Tables',
        ],
        youtubeLectures: [
          {
            title: 'Complete Quantitative Aptitude for PSU & NTPC Exams',
            channel: 'Feel Free to Learn',
            duration: '8 hrs',
            youtubeId: 'aptitude_full_course',
            url: 'https://www.youtube.com/results?search_query=quantitative+aptitude+feel+free+to+learn',
          },
        ],
        freeBooks: [
          ALL_FREE_BOOKS[9], // DRDO / PSU Aptitude Direct PDF
        ],
        questionBankCount: 80,
      },
      {
        id: 'topic-ntpc-power-sector',
        title: 'Indian Power Sector & Corporate General Awareness',
        description: 'NTPC corporate profile, installed capacity, renewable transition, National Electricity Plan, and CEA guidelines.',
        estimatedHours: 8,
        keyConcepts: [
          'NTPC 2032 Vision: 60 GW Renewable Capacity',
          'Major Thermal Plants (Vindhyachal, Singrauli, Ramagundam, Korba)',
          'Electricity Act 2003 & Central Electricity Authority (CEA) Role',
          'Green Hydrogen, Flue Gas Desulfurization (FGD) & Supercritical Units',
        ],
        youtubeLectures: [
          {
            title: 'Indian Power Sector Overview & NTPC Overview for Interviews',
            channel: 'StudyIQ IAS',
            duration: '28 mins',
            youtubeId: 'ntpc_power_sector_studyiq',
            url: 'https://www.youtube.com/results?search_query=indian+power+sector+studyiq',
          },
        ],
        freeBooks: [
          ALL_FREE_BOOKS[7], // CEA National Power Sector Direct PDF
        ],
        questionBankCount: 35,
      },
    ],
  },
];

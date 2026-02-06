(() => {
  "use strict";

  // Key used in localStorage so we can load/save reliably
  const STORAGE_KEY = "leetcode30_progress_v1";
  const ACTIVE_USER_KEY = "leetcode30_active_user_v1";
  const USERS = [
    { id: "me", label: "Me" },
    { id: "sister", label: "Sister" }
  ];

  // The full 30-day roadmap (60+ problems) with default progress state
  const baseRoadmap = [
    {
      day: 1,
      week: "Week 1: Arrays, Strings, Hash Maps",
      concepts: ["arrays", "two pointers"],
      problems: [
        { title: "Two Sum", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Best Time to Buy/Sell Stock", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 2,
      week: "Week 1: Arrays, Strings, Hash Maps",
      concepts: ["strings", "hash map"],
      problems: [
        { title: "Valid Anagram", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Ransom Note", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 3,
      week: "Week 1: Arrays, Strings, Hash Maps",
      concepts: ["arrays", "prefix thinking"],
      problems: [
        { title: "Product of Array Except Self", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Contains Duplicate", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Maximum Subarray", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 4,
      week: "Week 1: Arrays, Strings, Hash Maps",
      concepts: ["strings", "stack basics"],
      problems: [
        { title: "Valid Parentheses", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Valid Palindrome", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 5,
      week: "Week 1: Arrays, Strings, Hash Maps",
      concepts: ["hash map", "frequency"],
      problems: [
        { title: "Top K Frequent Elements", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Group Anagrams", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 6,
      week: "Week 1: Arrays, Strings, Hash Maps",
      concepts: ["arrays", "sorting"],
      problems: [
        { title: "Merge Sorted Array", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Move Zeroes", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 7,
      week: "Week 1: Arrays, Strings, Hash Maps",
      concepts: ["strings", "two pointers"],
      problems: [
        { title: "Longest Common Prefix", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Reverse String", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 8,
      week: "Week 2: Sliding Window, Prefix Sum, Stack",
      concepts: ["sliding window"],
      problems: [
        { title: "Longest Substring Without Repeating", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Permutation in String", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 9,
      week: "Week 2: Sliding Window, Prefix Sum, Stack",
      concepts: ["sliding window", "counts"],
      problems: [
        { title: "Minimum Window Substring", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Find All Anagrams", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 10,
      week: "Week 2: Sliding Window, Prefix Sum, Stack",
      concepts: ["prefix sum"],
      problems: [
        { title: "Subarray Sum Equals K", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Range Sum Query - Immutable", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 11,
      week: "Week 2: Sliding Window, Prefix Sum, Stack",
      concepts: ["prefix sum", "hash map"],
      problems: [
        { title: "Continuous Subarray Sum", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Binary Subarrays With Sum", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 12,
      week: "Week 2: Sliding Window, Prefix Sum, Stack",
      concepts: ["stack", "monotonic"],
      problems: [
        { title: "Daily Temperatures", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Next Greater Element I", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Largest Rectangle in Histogram", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 13,
      week: "Week 2: Sliding Window, Prefix Sum, Stack",
      concepts: ["stack", "string"],
      problems: [
        { title: "Min Remove to Make Valid", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Decode String", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 14,
      week: "Week 2: Sliding Window, Prefix Sum, Stack",
      concepts: ["window", "two pointers"],
      problems: [
        { title: "Longest Repeating Character Replace", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Max Consecutive Ones III", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 15,
      week: "Week 3: Trees, DFS, BFS",
      concepts: ["binary tree", "traversal"],
      problems: [
        { title: "Maximum Depth of Binary Tree", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Invert Binary Tree", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 16,
      week: "Week 3: Trees, DFS, BFS",
      concepts: ["DFS", "recursion"],
      problems: [
        { title: "Binary Tree Inorder Traversal", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Same Tree", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Subtree of Another Tree", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 17,
      week: "Week 3: Trees, DFS, BFS",
      concepts: ["BFS", "queue"],
      problems: [
        { title: "Binary Tree Level Order Traversal", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Binary Tree Right Side View", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 18,
      week: "Week 3: Trees, DFS, BFS",
      concepts: ["BST", "inorder"],
      problems: [
        { title: "Validate Binary Search Tree", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Kth Smallest in BST", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 19,
      week: "Week 3: Trees, DFS, BFS",
      concepts: ["DFS", "path"],
      problems: [
        { title: "Path Sum", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Lowest Common Ancestor (BST)", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 20,
      week: "Week 3: Trees, DFS, BFS",
      concepts: ["tree", "stack"],
      problems: [
        { title: "Serialize and Deserialize Binary Tree", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Flatten Binary Tree to Linked List", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 21,
      week: "Week 3: Trees, DFS, BFS",
      concepts: ["BFS", "graph-like"],
      problems: [
        { title: "Minimum Depth of Binary Tree", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Binary Tree Zigzag Level Order", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 22,
      week: "Week 4: Graphs, Heaps, Dynamic Programming",
      concepts: ["graph", "BFS"],
      problems: [
        { title: "Number of Islands", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Rotting Oranges", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Clone Graph", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 23,
      week: "Week 4: Graphs, Heaps, Dynamic Programming",
      concepts: ["graph", "DFS"],
      problems: [
        { title: "Course Schedule", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Course Schedule II", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 24,
      week: "Week 4: Graphs, Heaps, Dynamic Programming",
      concepts: ["heap", "priority queue"],
      problems: [
        { title: "Kth Largest Element", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Top K Frequent Words", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 25,
      week: "Week 4: Graphs, Heaps, Dynamic Programming",
      concepts: ["heap", "merge"],
      problems: [
        { title: "Merge K Sorted Lists", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Find Median from Data Stream", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 26,
      week: "Week 4: Graphs, Heaps, Dynamic Programming",
      concepts: ["DP", "1D"],
      problems: [
        { title: "Climbing Stairs", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "House Robber", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Min Cost Climbing Stairs", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 27,
      week: "Week 4: Graphs, Heaps, Dynamic Programming",
      concepts: ["DP", "2D"],
      problems: [
        { title: "Unique Paths", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Longest Common Subsequence", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 28,
      week: "Week 4: Graphs, Heaps, Dynamic Programming",
      concepts: ["DP", "matrix"],
      problems: [
        { title: "Maximal Square", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Minimum Path Sum", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 29,
      week: "Week 4: Graphs, Heaps, Dynamic Programming",
      concepts: ["DP", "subsequence"],
      problems: [
        { title: "Longest Increasing Subsequence", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Word Break", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    },
    {
      day: 30,
      week: "Week 4: Graphs, Heaps, Dynamic Programming",
      concepts: ["DP", "review"],
      problems: [
        { title: "Coin Change", solved: { py: false, js: false, cpp: false }, notes: "" },
        { title: "Edit Distance", solved: { py: false, js: false, cpp: false }, notes: "" }
      ],
      dayNotes: ""
    }
  ];

  // Helper to deep-copy the base data without sharing references
  function cloneRoadmap(data) {
    return JSON.parse(JSON.stringify(data));
  }

  // The mutable app state (loaded from localStorage or initialized fresh)
  let activeUserId = loadActiveUser();
  let roadmap = loadProgress(activeUserId);
  let currentDayIndex = 0;

  const dayListEl = document.querySelector("#day-list");
  const dayDetailsEl = document.querySelector("#day-details");
  const userTabs = document.querySelectorAll(".user-btn");

  // Render the left list of days so a user can navigate quickly
  function renderDayList() {
    dayListEl.innerHTML = "";

    roadmap.forEach((day, index) => {
      const btn = document.createElement("button");
      btn.className = "day-btn" + (index === currentDayIndex ? " active" : "");
      btn.textContent = `Day ${day.day}`;
      btn.addEventListener("click", () => {
        currentDayIndex = index;
        renderDayList();
        renderDayDetails(currentDayIndex);
      });
      dayListEl.appendChild(btn);
    });
  }

  // Render the main panel for the selected day
  function renderDayDetails(dayIndex) {
    const day = roadmap[dayIndex];

    dayDetailsEl.innerHTML = "";

    const header = document.createElement("h2");
    header.textContent = `Day ${day.day}`;

    const week = document.createElement("div");
    week.className = "week-badge";
    week.textContent = day.week;

    const conceptWrap = document.createElement("div");
    conceptWrap.className = "chips";
    day.concepts.forEach((concept) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = concept;
      conceptWrap.appendChild(chip);
    });

    dayDetailsEl.appendChild(header);
    dayDetailsEl.appendChild(week);
    dayDetailsEl.appendChild(conceptWrap);

    day.problems.forEach((problem, pIndex) => {
      const wrapper = document.createElement("div");
      wrapper.className = "problem";

      const title = document.createElement("div");
      title.className = "problem-title";
      title.textContent = problem.title;

      const checks = document.createElement("div");
      checks.className = "checks";

      const langs = [
        { key: "py", label: "Python" },
        { key: "js", label: "JavaScript" },
        { key: "cpp", label: "C++" }
      ];

      langs.forEach((lang) => {
        const label = document.createElement("label");
        const box = document.createElement("input");
        box.type = "checkbox";
        box.checked = problem.solved[lang.key];
        box.dataset.dayIndex = dayIndex.toString();
        box.dataset.problemIndex = pIndex.toString();
        box.dataset.lang = lang.key;
        label.appendChild(box);
        label.append(` ${lang.label}`);
        checks.appendChild(label);
      });

      const notes = document.createElement("input");
      notes.className = "notes";
      notes.placeholder = "Notes for this problem...";
      notes.value = problem.notes;
      notes.dataset.dayIndex = dayIndex.toString();
      notes.dataset.problemIndex = pIndex.toString();
      notes.dataset.noteType = "problem";

      wrapper.appendChild(title);
      wrapper.appendChild(checks);
      wrapper.appendChild(notes);
      dayDetailsEl.appendChild(wrapper);
    });

    const dayNotesWrap = document.createElement("div");
    dayNotesWrap.className = "day-notes";
    const dayNotesLabel = document.createElement("div");
    dayNotesLabel.textContent = "Day Notes";

    const dayNotesInput = document.createElement("textarea");
    dayNotesInput.value = day.dayNotes;
    dayNotesInput.placeholder = "Overall notes for the day...";
    dayNotesInput.dataset.dayIndex = dayIndex.toString();
    dayNotesInput.dataset.noteType = "day";

    dayNotesWrap.appendChild(dayNotesLabel);
    dayNotesWrap.appendChild(dayNotesInput);
    dayDetailsEl.appendChild(dayNotesWrap);

  }

  // Highlight the active user tab so it is obvious whose data is showing
  function renderUserTabs() {
    userTabs.forEach((btn) => {
      const isActive = btn.dataset.user === activeUserId;
      btn.classList.toggle("active", isActive);
    });
  }

  // Switch between "Me" and "Sister" without mixing data
  function handleUserSwitch(event) {
    const target = event.target;
    if (!target.classList.contains("user-btn")) {
      return;
    }

    const nextUserId = target.dataset.user;
    if (nextUserId === activeUserId) {
      return;
    }

    activeUserId = nextUserId;
    saveActiveUser(activeUserId);
    roadmap = loadProgress(activeUserId);
    currentDayIndex = 0;
    renderUserTabs();
    renderDayList();
    renderDayDetails(currentDayIndex);
    updateProgressUI();
  }

  // Handle checkbox toggles and update state immediately
  function handleCheckboxChange(event) {
    const target = event.target;
    if (target.tagName !== "INPUT" || target.type !== "checkbox") {
      return;
    }

    const dayIndex = Number(target.dataset.dayIndex);
    const problemIndex = Number(target.dataset.problemIndex);
    const lang = target.dataset.lang;

    roadmap[dayIndex].problems[problemIndex].solved[lang] = target.checked;
    saveProgress();
    updateProgressUI();
  }

  // Handle notes (problem or day) without adding extra buttons
  function handleNotesChange(event) {
    const target = event.target;
    if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
      return;
    }

    const dayIndex = Number(target.dataset.dayIndex);
    const noteType = target.dataset.noteType;

    if (noteType === "problem") {
      const problemIndex = Number(target.dataset.problemIndex);
      roadmap[dayIndex].problems[problemIndex].notes = target.value;
    }

    if (noteType === "day") {
      roadmap[dayIndex].dayNotes = target.value;
    }

    saveProgress();
  }

  // Save progress safely using JSON so objects stay intact
  function saveProgress() {
    const key = `${STORAGE_KEY}_${activeUserId}`;
    localStorage.setItem(key, JSON.stringify(roadmap));
  }

  // Load progress if present; otherwise clone the base roadmap
  function loadProgress(userId) {
    const key = `${STORAGE_KEY}_${userId}`;
    const raw = localStorage.getItem(key);
    if (!raw) {
      if (userId === "me") {
        const legacy = localStorage.getItem(STORAGE_KEY);
        if (legacy) {
          try {
            const parsedLegacy = JSON.parse(legacy);
            if (Array.isArray(parsedLegacy) && parsedLegacy.length === baseRoadmap.length) {
              localStorage.setItem(key, JSON.stringify(parsedLegacy));
              return parsedLegacy;
            }
          } catch (error) {
            // Ignore legacy data if it cannot be parsed
          }
        }
      }
      return cloneRoadmap(baseRoadmap);
    }

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === baseRoadmap.length) {
        return parsed;
      }
    } catch (error) {
      // Fall back to the base roadmap if localStorage is corrupt
    }

    return cloneRoadmap(baseRoadmap);
  }

  // Remember the last active user so reloads stay on the same player
  function saveActiveUser(userId) {
    localStorage.setItem(ACTIVE_USER_KEY, userId);
  }

  function loadActiveUser() {
    const saved = localStorage.getItem(ACTIVE_USER_KEY);
    if (saved && USERS.some((u) => u.id === saved)) {
      return saved;
    }
    return "me";
  }

  // Calculate overall and per-language progress for the progress bars
  function calculateProgress(data) {
    let totalCheckboxes = 0;
    let totalSolved = 0;
    let pySolved = 0;
    let jsSolved = 0;
    let cppSolved = 0;

    data.forEach((day) => {
      day.problems.forEach((problem) => {
        totalCheckboxes += 3;
        if (problem.solved.py) pySolved += 1;
        if (problem.solved.js) jsSolved += 1;
        if (problem.solved.cpp) cppSolved += 1;
      });
    });

    totalSolved = pySolved + jsSolved + cppSolved;

    const overallPercent = totalCheckboxes === 0 ? 0 : Math.round((totalSolved / totalCheckboxes) * 100);
    const pyPercent = totalCheckboxes === 0 ? 0 : Math.round((pySolved / (totalCheckboxes / 3)) * 100);
    const jsPercent = totalCheckboxes === 0 ? 0 : Math.round((jsSolved / (totalCheckboxes / 3)) * 100);
    const cppPercent = totalCheckboxes === 0 ? 0 : Math.round((cppSolved / (totalCheckboxes / 3)) * 100);

    return { overallPercent, pyPercent, jsPercent, cppPercent };
  }

  function loadOtherUserProgress(userId) {
    return loadProgress(userId);
  }

  // Update the progress bars whenever progress changes
  function updateProgressUI() {
    const { overallPercent, pyPercent, jsPercent, cppPercent } = calculateProgress(roadmap);
    const otherUserId = activeUserId === "me" ? "sister" : "me";
    const otherRoadmap = loadOtherUserProgress(otherUserId);
    const otherProgress = calculateProgress(otherRoadmap);

    document.querySelector("#overall-bar").style.width = `${overallPercent}%`;
    document.querySelector("#overall-text").textContent = `${overallPercent}%`;

    document.querySelector("#py-bar").style.width = `${pyPercent}%`;
    document.querySelector("#py-text").textContent = `${pyPercent}%`;

    document.querySelector("#js-bar").style.width = `${jsPercent}%`;
    document.querySelector("#js-text").textContent = `${jsPercent}%`;

    document.querySelector("#cpp-bar").style.width = `${cppPercent}%`;
    document.querySelector("#cpp-text").textContent = `${cppPercent}%`;

    const meLabel = document.querySelector("#vs-me-label");
    const sisterLabel = document.querySelector("#vs-sister-label");
    meLabel.textContent = "Me";
    sisterLabel.textContent = "Sister";

    const meProgress = activeUserId === "me" ? overallPercent : otherProgress.overallPercent;
    const sisterProgress = activeUserId === "sister" ? overallPercent : otherProgress.overallPercent;

    document.querySelector("#vs-me-bar").style.width = `${meProgress}%`;
    document.querySelector("#vs-me-text").textContent = `${meProgress}%`;

    document.querySelector("#vs-sister-bar").style.width = `${sisterProgress}%`;
    document.querySelector("#vs-sister-text").textContent = `${sisterProgress}%`;
  }

  // Initial render so the app is ready on first load
  // Event delegation keeps listeners minimal and easy to understand
  dayDetailsEl.addEventListener("change", handleCheckboxChange);
  dayDetailsEl.addEventListener("input", handleNotesChange);
  userTabs.forEach((btn) => {
    btn.addEventListener("click", handleUserSwitch);
  });
  renderUserTabs();
  renderDayList();
  renderDayDetails(currentDayIndex);
  updateProgressUI();
})();

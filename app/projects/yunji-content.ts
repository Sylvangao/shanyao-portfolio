// Adapted from the owner's Notion narrative. Editorial notes and unverified
// platform metrics are intentionally excluded from the public case study.
export const yunjiChapters = [
  {
    id: 'context',
    label: ['项目背景', 'Context'],
    title: ['从分散的资料，到共同维护的内容。', 'From scattered files to shared knowledge.'],
    paragraphs: [
      [
        '企业内容分散在微信文件、在线协作文档和本地资料中。内容持续积累，却缺少统一的组织、维护与使用方式。乐享 1.0 已有基础文档能力，团队希望探索新的知识管理与协作体验，云迹因此以内部孵化项目启动。',
        'Enterprise content lived across chat attachments, collaborative documents and local files. As content accumulated, there was no consistent way to organize and maintain it. With basic document capabilities already in Lexiang 1.0, the team incubated Yunji to explore a new knowledge and collaboration experience.',
      ],
      [
        '早期具体客户场景和正式研究输入有限。我与产品团队结合现有工具的问题及竞品分析，先建立可供内部使用的核心产品，再通过真实使用持续检验方向。',
        'Specific customer scenarios and formal research were limited at the outset. Working with product partners, I used existing workflow problems and competitive analysis to shape a core product for internal use, then refined it through day-to-day use.',
      ],
    ],
  },
  {
    id: 'system',
    label: ['产品框架', 'Product framework'],
    title: [
      '不止于写文档，\n更要围绕内容工作。',
      'Beyond writing documents.\nWorking around content.',
    ],
    paragraphs: [
      [
        '计划整理、讨论、任务分配和进度跟踪相互关联。我的设计范围从编辑页面扩展到文档、任务与智能表格，让内容对象与操作方式保持一致。',
        'Planning, discussion, task assignment and progress tracking are connected activities. My scope grew beyond the editor to documents, tasks and databases, with consistent objects and interaction patterns across the product.',
      ],
    ],
    image: 'S03',
    caption: [
      '内部产品规划、协作文档与任务派发场景。',
      'Internal planning, collaborative documents and task assignment.',
    ],
  },
  {
    id: 'navigation',
    label: ['信息架构', 'Information architecture'],
    title: ['结构要清楚，\n也要容易被用起来。', 'Clear structure.\nPractical to set up.'],
    paragraphs: [
      [
        '我曾推动减少公司、团队空间、知识库、文档之间的层级。但大型企业的分支团队需要独立空间，相近的知识库名称也需要组织上下文，最终保留四层结构。',
        'I explored reducing the hierarchy between company, team space, knowledge base and document. Large organizations needed independent team spaces and organizational context to distinguish similarly named knowledge bases, so the four levels remained.',
      ],
      [
        '我也探索过借鉴 Discord 的空间导航，将空间切换与内容浏览分开。方案早期未采用：依赖图标识别，会给团队带来初始配置负担。这让我更早地把配置成本纳入导航设计，而不只关注界面是否清晰。',
        'I also explored Discord-inspired navigation that separated space switching from content browsing. The early concept was not adopted: icon-based recognition created setup work for teams. It highlighted that navigation clarity depends on configuration effort as well as visual structure.',
      ],
    ],
  },
  {
    id: 'workspace',
    label: ['界面层次', 'Workspace design'],
    title: [
      '让内容成为主角，\n把复杂度交给用户掌控。',
      'Content at the center.\nComplexity within reach.',
    ],
    paragraphs: [
      [
        '我将工作界面分成内容层、功能扩展层和导航辅助层。正文保持主体位置；评论、任务和大纲按需展开；空间切换、搜索及目录则作为全局辅助。',
        'I organized the workspace into content, contextual extensions and navigation. The document remains central; comments, tasks and outlines expand when needed; space switching, search and the content tree support global navigation.',
      ],
      [
        '左右侧栏由用户主动展开或收起。阅读时减少面板占用，处理任务与评论时并列查看，让同一框架兼容专注阅读与复杂工作。',
        'Users can open or close the side panels themselves. Reading can stay focused, while tasks and comments can be viewed alongside the document. The same framework supports both concentrated reading and information-rich work.',
      ],
    ],
    image: 'S05',
    caption: [
      '内容、功能扩展与导航辅助，建立稳定的界面层次。',
      'A consistent hierarchy for content, contextual tools and navigation.',
    ],
    secondaryImage: 'S06',
    secondaryCaption: [
      '根据当前任务，主动调整侧栏与信息密度。',
      'Users adjust side panels and information density to suit their task.',
    ],
  },
  {
    id: 'editor',
    label: ['文档编辑', 'Document editor'],
    title: ['内容可以不同，\n操作规则保持一致。', 'Different content.\nFamiliar interactions.'],
    paragraphs: [
      [
        '以块作为内容组织的基础，让文字、标题、列表与表格沿用共同的创建、转换和移动规则。通过统一入口插入内容，通过菜单或文本选择转换类型，再以块级操作和拖拽调整顺序。',
        'Blocks became the foundation for text, headings, lists and tables. A common entry point creates content; menus and text selection change its type; block actions and drag-and-drop reorganize it.',
      ],
      [
        '这套方式参考成熟协作工具。我的重点是让新能力建立在已有规则上，同时保留不同内容类型所需的差异，避免每增加一种功能，就增加一套独立操作。',
        'Building on established collaboration patterns, I focused on extending existing rules while preserving the differences each content type required. New capabilities should not demand an entirely new interaction model.',
      ],
    ],
    image: 'S07',
    caption: [
      '统一内容块的创建、类型转换与移动操作。',
      'Consistent creation, type conversion and movement for content blocks.',
    ],
  },
  {
    id: 'tasks',
    label: ['核心取舍', 'A key trade-off'],
    title: [
      '先让任务流转起来，\n再扩展协作规则。',
      'Make the task flow work.\nThen add complexity.',
    ],
    paragraphs: [
      [
        '早期规划希望支持执行人、参与者等多种角色，以及更复杂的完成权限与条件。我从 MVP 的角度推动收敛：优先建立容易理解、可以使用的任务流程，而不是让首版承担大量配置成本。',
        'Early plans included multiple roles and complex completion permissions and conditions. I advocated an MVP approach: prioritize an understandable, usable task flow rather than burdening the first release with extensive configuration.',
      ],
      [
        '这一阶段围绕创建、通知与执行跟踪组织体验，企业微信联动与通知是重点方向。任务保留来源、负责人、时间和状态，侧栏让用户在当前文档旁查看任务详情。',
        'The experience centered on task creation, notifications and execution tracking, with WeCom integration and notifications as a priority direction. Tasks retained their source, owner, dates and status, while a side panel kept task details alongside the current document.',
      ],
    ],
    image: 'S11',
    caption: [
      '任务详情与跟踪设计；复杂协作规则留待后续迭代。',
      'Task details and tracking, with advanced collaboration rules left for later iterations.',
    ],
  },
  {
    id: 'database',
    label: ['智能表格', 'Databases'],
    title: ['同一组信息，\n不同的工作视角。', 'One set of information.\nDifferent ways to work.'],
    paragraphs: [
      [
        '负责人、日期和状态等结构化记录，可以在表格、看板与日历视图间切换。表格适合整理属性，看板关注状态分布，日历聚焦时间安排。',
        'Structured records such as owners, dates and status can be viewed as a table, board or calendar. Tables support attribute management, boards emphasize status, and calendars focus on scheduling.',
      ],
      [
        '每条记录又可以展开为带属性与正文的页面，默认在侧栏打开，整页入口在悬浮操作时出现。重点是协调视图、记录与详情之间的关系，让结构化信息与详细内容保持连接。',
        'Each record can expand into a page with properties and body content. It opens in a side panel by default, with a full-page option available on hover. The design connects views, records and details rather than treating them as separate table styles.',
      ],
    ],
    image: 'S10',
    caption: [
      '同一数据的多视图组织，以及记录与页面的连接。',
      'Multiple views of the same data, with records connected to detailed pages.',
    ],
  },
  {
    id: 'delivery',
    label: ['落地与演进', 'Delivery & evolution'],
    title: ['从内部使用开始，\n走向持续演进。', 'Built for internal use.\nDesigned to evolve.'],
    paragraphs: [
      [
        '约半年完成早期核心能力建设，并投入团队内部使用。我的工作持续覆盖设计细化、开发对接与验收，打磨任务、表格视图、评论、页面宽度与侧栏等细节。2024 年 6 月，项目完成核心场景覆盖与企业内场景验证。',
        'The team built the early core capabilities in roughly six months and put them into internal use. I continued through detailed design, engineering collaboration and acceptance reviews, refining tasks, database views, comments, page width and side panels. By June 2024, the project covered its core scenarios and had completed internal enterprise validation.',
      ],
      [
        '2025 年 1 月，云迹与原乐享融合，形成乐享 2.0 MVP。后续整体设计陆续移交设计中心，我更多负责移动端及部分功能体验。',
        'In January 2025, Yunji merged with the existing Lexiang product to form the Lexiang 2.0 MVP. Overall design ownership gradually moved to the design center; my later scope focused more on mobile and selected feature experiences.',
      ],
    ],
    image: 'S04',
    caption: [
      '团队真实使用中的产品、技术和设计内容。',
      'Product, engineering and design content in actual internal use.',
    ],
  },
  {
    id: 'reflection',
    label: ['回看项目', 'Reflection'],
    title: [
      '新产品的起点，\n未必是一张空白页。',
      'A new product rarely\nstarts with a blank page.',
    ],
    paragraphs: [
      [
        '首版以直接创建内容为主，导入能力后期才加入。在自己的使用中，我逐渐意识到，企业早已有大量积累：迁移、调整与重新组织已有资料，可能比从空白开始更接近真实起点。',
        'The first release emphasized creating new content; import capabilities came later. Using the product myself made clear that enterprises already have substantial content. Migrating, adapting and reorganizing it may be a more realistic starting point than a blank page.',
      ],
      [
        '如果重新开展，我会更早梳理已有内容的来源与迁移任务，用更具体的业务任务检验导航、权限和协作流程。完整的产品能力，需要持续与真实工作中的使用条件对照。',
        'Starting again, I would map existing content sources and migration tasks earlier, then test navigation, permissions and collaboration against more specific business tasks. A complete feature set must continually be checked against the conditions of real work.',
      ],
    ],
  },
] as const;

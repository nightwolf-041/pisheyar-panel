import React from "react";

const maxDepth = 5;

const renderDepthTitle = ({ path }) => `Depth: ${path.length}`;

const treeData = [
  {
    title: "اسب",
    subtitle: "`تک شاخ`",
    expanded: false,
    children: [
      {
        title: "عربی",
        subtitle: "اسبل های عربی خر کار"
      },
      {
        title: "ایرانی",
        subtitle: (
          <span>
            اسب هایی بسیار زیبا و پرروووو
          </span>
        )
      }
    ]
  },

  {
    expanded: false,
    title: "سگ",
    children: [
      {
        expanded: false,
        title: "وحشی",
        children: [{ title: "افغان" }]
      }
    ]
  },

  {
    title: "مار",
    subtitle:
      "شاخه های زیادی ندارن"
  },

  {
    title: "پیشی ها",
    // subtitle: ({ node }) => `expanded: ${node.expanded ? "true" : "false"}`,
    subtitle: "پیشی های ایرانی رو بررسی کنیم",
    children: [
      {
        title: "ایرانی",
        subtitle: ({ node }) => `expanded: ${node.expanded ? "true" : "false"}`,
        children: [{ title: "تهرانی" }, { title: "میانه ای" }]
      }
    ]
  },

  {
    title: "آدم ها",
    subtitle: "اووو شت آدم ها",
    children: [
      {
        title: (
          <div>
            <div
              style={{
                backgroundColor: "gray",
                display: "inline-block",
                borderRadius: 10,
                color: "#FFF",
                padding: "0 5px"
              }}
            >
              امان از
            </div>
            &nbsp;آدم ها
          </div>
        )
      },

      {
        expanded: true,
        title: "آدم های آفریقایی",
        subtitle: `این آدم ها سیاهن`,
        children: [
          {
            expanded: true,
            title: renderDepthTitle,
            subtitle: `اینم که عدد عمقشه`,
            children: [
              {
                expanded: true,
                title: renderDepthTitle,
                subtitle: `اینم که عدد عمقشه`,
                children: [
                  { title: renderDepthTitle , subtitle: `اینم که عدد عمقشه`},
                  {
                    title: ({ path }) =>
                      path.length >= maxDepth
                        ? "این دیگه تهشه"
                        : "میتونه ادامه داشته باشه"
                  }
                ]
              }
            ]
          }
        ]
      },
    //   {
    //     title: "Disable dragging on a per-node basis with the `canDrag` prop",
    //     subtitle: "Or set it to false to disable all dragging.",
    //     noDragging: true
    //   },
    //   {
    //     title: "You cannot give this children",
    //     subtitle:
    //       "Dropping is prevented via the `canDrop` API using `nextParent`",
    //     noChildren: true
    //   },
    //   {
    //     title:
    //       "When node contents are really long, it will cause a horizontal scrollbar" +
    //       " to appear. Deeply nested elements will also trigger the scrollbar."
    //   }
    ]
  }
];

export default treeData;

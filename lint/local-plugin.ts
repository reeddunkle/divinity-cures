import { definePlugin, defineRule, type ESTree } from "@oxlint/plugins";

const noReExport = defineRule({
  create(context) {
    const report = (node: ESTree.ExportAllDeclaration | ESTree.ExportNamedDeclaration) => {
      context.report({
        message: "Import from the defining module instead of re-exporting it.",
        node,
      });
    };

    return {
      ExportAllDeclaration: report,
      ExportNamedDeclaration(node) {
        if (node.source !== null) {
          report(node);
        }
      },
    };
  },
  meta: {
    docs: {
      description: "Disallow re-exporting symbols from other modules.",
    },
    type: "suggestion",
  },
});

export default definePlugin({
  meta: { name: "local" },
  rules: { "no-re-export": noReExport },
});

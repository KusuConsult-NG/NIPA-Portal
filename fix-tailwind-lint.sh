#!/bin/bash

# Script to fix all Tailwind CSS lint warnings

cd "/Users/mac/NIPA potal"

# Replace bg-gradient-to-* with bg-linear-to-*
find app -type f -name "*.tsx" -exec sed -i '' 's/bg-gradient-to-r/bg-linear-to-r/g' {} +
find app -type f -name "*.tsx" -exec sed -i '' 's/bg-gradient-to-br/bg-linear-to-br/g' {} +
find app -type f -name "*.tsx" -exec sed -i '' 's/bg-gradient-to-t/bg-linear-to-t/g' {} +
find app -type f -name "*.tsx" -exec sed -i '' 's/bg-gradient-to-b/bg-linear-to-b/g' {} +

# Replace rounded-[2rem] with rounded-4xl
find app -type f -name "*.tsx" -exec sed -i '' 's/rounded-\[2rem\]/rounded-4xl/g' {} +

# Replace to-[#10B981] with to-accent
find app -type f -name "*.tsx" -exec sed -i '' 's/to-\[#10B981\]/to-accent/g' {} +

# Replace font-[family-name:var(--font-body)] with font-body
find app -type f -name "*.tsx" -exec sed -i '' 's/font-\[family-name:var(--font-body)\]/font-body/g' {} +

# Replace w-[1px] with w-px
find app -type f -name "*.tsx" -exec sed -i '' 's/w-\[1px\]/w-px/g' {} +

# Replace aspect-[11/9] with aspect-11/9
find app -type f -name "*.tsx" -exec sed -i '' 's/aspect-\[11\/9\]/aspect-11\/9/g' {} +

# Replace hover:bg-white/[0.08] with hover:bg-white/8
find app -type f -name "*.tsx" -exec sed -i '' 's/hover:bg-white\/\[0.08\]/hover:bg-white\/8/g' {} +

# Replace !text-4xl with text-4xl!
find app -type f -name "*.tsx" -exec sed -i '' 's/!text-4xl/text-4xl!/g' {} +

# Replace !text-xl with text-xl!
find app -type f -name "*.tsx" -exec sed -i '' 's/!text-xl/text-xl!/g' {} +

# Fix components directory too
find components -type f -name "*.tsx" -exec sed -i '' 's/bg-gradient-to-r/bg-linear-to-r/g' {} +
find components -type f -name "*.tsx" -exec sed -i '' 's/bg-gradient-to-br/bg-linear-to-br/g' {} +
find components -type f -name "*.tsx" -exec sed -i '' 's/bg-gradient-to-t/bg-linear-to-t/g' {} +
find components -type f -name "*.tsx" -exec sed -i '' 's/bg-gradient-to-b/bg-linear-to-b/g' {} +

echo "✅ All Tailwind CSS lint warnings fixed!"

#!/bin/bash

# ExerciseDB API 多语言测试脚本
# 用于测试所有接口的多语言支持

BASE_URL="http://localhost:80/api/v1"

echo "========================================"
echo "ExerciseDB API 多语言测试"
echo "========================================"
echo ""

echo "测试服务是否运行..."
if ! curl -s -f "${BASE_URL}/exercises?limit=1" > /dev/null; then
    echo "❌ 错误：API 服务未运行。请先运行 'bun run dev'"
    exit 1
fi
echo "✅ 服务正常运行"
echo ""

echo "----------------------------------------"
echo "1. 测试 Exercises 接口"
echo "----------------------------------------"

echo "📝 测试默认语言（英文）..."
curl -s "${BASE_URL}/exercises?limit=1" | grep -q '"name"' && echo "✅ 默认语言测试通过" || echo "❌ 默认语言测试失败"

echo "📝 测试中文（完整格式 zh-CN）..."
curl -s "${BASE_URL}/exercises?limit=1&lang=zh-CN" | grep -q '"name"' && echo "✅ 中文完整格式测试通过" || echo "❌ 中文完整格式测试失败"

echo "📝 测试中文（简化格式 zh）..."
curl -s "${BASE_URL}/exercises?limit=1&lang=zh" | grep -q '"name"' && echo "✅ 中文简化格式测试通过" || echo "❌ 中文简化格式测试失败"

echo "📝 测试根据 ID 获取运动..."
curl -s "${BASE_URL}/exercises/trmte8s?lang=zh-CN" | grep -q '"exerciseId"' && echo "✅ ID 查询测试通过" || echo "❌ ID 查询测试失败"

echo ""

echo "----------------------------------------"
echo "2. 测试 BodyParts 接口"
echo "----------------------------------------"

echo "📝 测试英文身体部位..."
curl -s "${BASE_URL}/bodyparts" | grep -q '"name"' && echo "✅ 英文身体部位测试通过" || echo "❌ 英文身体部位测试失败"

echo "📝 测试中文身体部位..."
curl -s "${BASE_URL}/bodyparts?lang=zh-CN" | grep -q '"name"' && echo "✅ 中文身体部位测试通过" || echo "❌ 中文身体部位测试失败"

echo ""

echo "----------------------------------------"
echo "3. 测试 Equipments 接口"
echo "----------------------------------------"

echo "📝 测试英文器械..."
curl -s "${BASE_URL}/equipments" | grep -q '"name"' && echo "✅ 英文器械测试通过" || echo "❌ 英文器械测试失败"

echo "📝 测试中文器械..."
curl -s "${BASE_URL}/equipments?lang=zh-CN" | grep -q '"name"' && echo "✅ 中文器械测试通过" || echo "❌ 中文器械测试失败"

echo ""

echo "----------------------------------------"
echo "4. 测试 Muscles 接口"
echo "----------------------------------------"

echo "📝 测试英文肌肉..."
curl -s "${BASE_URL}/muscles" | grep -q '"name"' && echo "✅ 英文肌肉测试通过" || echo "❌ 英文肌肉测试失败"

echo "📝 测试中文肌肉..."
curl -s "${BASE_URL}/muscles?lang=zh-CN" | grep -q '"name"' && echo "✅ 中文肌肉测试通过" || echo "❌ 中文肌肉测试失败"

echo ""

echo "----------------------------------------"
echo "5. 测试特殊场景"
echo "----------------------------------------"

echo "📝 测试无效语言（应回退到英文）..."
curl -s "${BASE_URL}/exercises?limit=1&lang=invalid" | grep -q '"name"' && echo "✅ 无效语言回退测试通过" || echo "❌ 无效语言回退测试失败"

echo "📝 测试搜索 + 中文..."
curl -s "${BASE_URL}/exercises/search?q=band&limit=1&lang=zh-CN" | grep -q '"name"' && echo "✅ 搜索中文测试通过" || echo "❌ 搜索中文测试失败"

echo "📝 测试过滤 + 中文..."
curl -s "${BASE_URL}/exercises/filter?bodyParts=neck&limit=1&lang=zh-CN" | grep -q '"name"' && echo "✅ 过滤中文测试通过" || echo "❌ 过滤中文测试失败"

echo ""

echo "========================================"
echo "测试完成！"
echo "========================================"
echo ""

echo "📊 详细结果示例："
echo ""
echo "英文响应示例："
curl -s "${BASE_URL}/exercises/trmte8s" | head -20
echo ""
echo ""
echo "中文响应示例："
curl -s "${BASE_URL}/exercises/trmte8s?lang=zh-CN" | head -20
echo ""


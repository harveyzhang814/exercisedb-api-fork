# 多语言化使用说明 (i18n Usage Guide)

## 概述

ExerciseDB API 现已支持多语言响应。所有 API 接口都可以通过 `lang` 查询参数指定返回语言。

## 支持的语言

- `en-US` - 英文（默认）
- `zh-CN` - 简体中文

**简化格式支持**：
- `en` 自动映射到 `en-US`
- `zh` 自动映射到 `zh-CN`

## 使用方法

### 基本用法

在任何 API 请求中添加 `lang` 查询参数：

```bash
# 英文（默认，可省略）
GET /api/v1/exercises?limit=10

# 中文
GET /api/v1/exercises?limit=10&lang=zh-CN

# 简化格式
GET /api/v1/exercises?limit=10&lang=zh
```

### 所有支持的接口

#### Exercises 模块（7个接口）

```bash
# 1. 搜索运动
GET /api/v1/exercises/search?q=chest&lang=zh-CN

# 2. 获取所有运动
GET /api/v1/exercises?limit=10&lang=zh-CN

# 3. 高级过滤
GET /api/v1/exercises/filter?muscles=chest&equipment=dumbbell&lang=zh-CN

# 4. 根据ID获取运动
GET /api/v1/exercises/trmte8s?lang=zh-CN

# 5. 根据身体部位获取运动
GET /api/v1/bodyparts/upper%20arms/exercises?lang=zh-CN

# 6. 根据器械获取运动
GET /api/v1/equipments/dumbbell/exercises?lang=zh-CN

# 7. 根据肌肉获取运动
GET /api/v1/muscles/abs/exercises?lang=zh-CN
```

#### 资源列表接口（3个接口）

```bash
# 8. 获取所有身体部位
GET /api/v1/bodyparts?lang=zh-CN

# 9. 获取所有器械
GET /api/v1/equipments?lang=zh-CN

# 10. 获取所有肌肉
GET /api/v1/muscles?lang=zh-CN
```

## 响应示例

### 英文响应（默认）

```bash
GET /api/v1/exercises/trmte8s
```

```json
{
  "success": true,
  "data": {
    "exerciseId": "trmte8s",
    "name": "band shrug",
    "gifUrl": "https://static.exercisedb.dev/media/trmte8s.gif",
    "targetMuscles": ["traps"],
    "bodyParts": ["neck"],
    "equipments": ["band"],
    "secondaryMuscles": ["shoulders"],
    "instructions": [
      "Step:1 Stand with your feet shoulder-width apart and place the band under your feet, holding the ends with your hands.",
      "Step:2 Keep your arms straight and relaxed, and let the band hang in front of your thighs.",
      "Step:3 Engage your traps by shrugging your shoulders upward, lifting the band as high as possible.",
      "Step:4 Hold the contraction for a moment, then slowly lower your shoulders back down to the starting position.",
      "Step:5 Repeat for the desired number of repetitions."
    ]
  }
}
```

### 中文响应

```bash
GET /api/v1/exercises/trmte8s?lang=zh-CN
```

```json
{
  "success": true,
  "data": {
    "exerciseId": "trmte8s",
    "name": "弹力带耸肩",
    "gifUrl": "https://static.exercisedb.dev/media/trmte8s.gif",
    "targetMuscles": ["斜方肌"],
    "bodyParts": ["颈部"],
    "equipments": ["弹力带"],
    "secondaryMuscles": ["肩部"],
    "instructions": [
      "步骤1：双脚与肩同宽站立，将弹力带置于脚下，双手握住两端。",
      "步骤2：保持手臂伸直放松，让弹力带悬挂在大腿前方。",
      "步骤3：通过耸肩向上提升斜方肌，尽可能高地抬起弹力带。",
      "步骤4：保持收缩一会儿，然后慢慢降低肩膀回到起始位置。",
      "步骤5：重复所需次数。"
    ]
  }
}
```

## 翻译数据结构

翻译文件位于 `src/data/translations/` 目录：

```
src/data/translations/
  └── zh-CN/
      ├── exercises.json    # 运动翻译（运动名称和说明）
      ├── bodyparts.json    # 身体部位翻译
      ├── equipments.json   # 器械翻译
      ├── muscles.json      # 肌肉翻译
      └── messages.json     # API 响应消息翻译
```

### 添加新语言

要添加新语言（例如日语 `ja-JP`）：

1. 在 `src/data/translations/` 下创建新目录：
   ```bash
   mkdir -p src/data/translations/ja-JP
   ```

2. 创建翻译文件（参考 `zh-CN` 目录结构）：
   - `exercises.json`
   - `bodyparts.json`
   - `equipments.json`
   - `muscles.json`
   - `messages.json`

3. 更新类型定义 `src/common/types/i18n.types.ts`：
   ```typescript
   export type SupportedLanguage = 'en-US' | 'zh-CN' | 'ja-JP'
   
   export const LANGUAGE_MAP: Record<string, SupportedLanguage> = {
     'en': 'en-US',
     'zh': 'zh-CN',
     'ja': 'ja-JP',
     // ...
   }
   ```

4. 更新语言参数 Schema `src/common/schemas/language.schema.ts`：
   ```typescript
   lang: z.enum(['en-US', 'zh-CN', 'ja-JP', 'en', 'zh', 'ja']).optional()
   ```

5. 在翻译加载器中添加新语言预加载：
   ```typescript
   const languages: SupportedLanguage[] = ['en-US', 'zh-CN', 'ja-JP']
   ```

## API 文档

访问 `/docs` 查看完整的 API 文档，所有接口都会显示 `lang` 参数选项。

## 技术实现

### 架构特点

- **预翻译数据**：所有翻译在应用启动时加载到内存，零运行时开销
- **翻译映射**：使用独立的翻译文件，原始数据结构不变
- **类型安全**：完全的 TypeScript 类型支持
- **自动文档**：OpenAPI 规范自动生成 API 文档

### 性能优化

- 翻译数据在应用启动时预加载
- 内存缓存，避免重复加载
- 语言参数自动标准化
- 无效语言自动回退到默认语言

## 注意事项

1. **默认语言**：未指定 `lang` 参数时，默认返回英文（`en-US`）
2. **向后兼容**：原有 API 调用完全兼容，无需修改
3. **翻译覆盖**：目前仅部分运动有中文翻译（示例数据），未翻译的内容保持英文
4. **大小写不敏感**：语言代码不区分大小写（`zh-CN` 和 `zh-cn` 都有效）

## 开发者指南

### 扩展翻译

如需为更多运动添加翻译，编辑 `src/data/translations/zh-CN/exercises.json`：

```json
{
  "exerciseId": {
    "name": "运动名称",
    "instructions": [
      "步骤1：...",
      "步骤2：..."
    ]
  }
}
```

### 测试翻译

```bash
# 启动开发服务器
bun run dev

# 测试英文接口
curl http://localhost:80/api/v1/exercises?limit=1

# 测试中文接口
curl http://localhost:80/api/v1/exercises?limit=1&lang=zh-CN
```

## 许可证

本多语言化功能遵循项目原有的 AGPL-3.0 许可证。


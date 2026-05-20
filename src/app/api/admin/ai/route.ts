import { requireAdmin } from '@/lib/auth-guard';
import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  message: string;
  context?: string;
}

function generateResponse(message: string): string {
  const lower = message.toLowerCase();

  if (
    lower.includes('project') &&
    (lower.includes('add') || lower.includes('new') || lower.includes('create'))
  ) {
    return `**Adding a New Project**

Head to **Admin → Projects** and click **New Project**. Here's what to fill in:

**Required fields:**
- **Title** — The project name (e.g. "E-Commerce Dashboard")
- **Slug** — URL-friendly version (auto-generated from title)
- **Description** — A short summary of what the project does
- **Category** — Choose from: web, mobile, design, or other

**Optional but recommended:**
- **Image URL** — A screenshot or preview of the project
- **GitHub URL** — Link to the source code
- **Live URL** — Link to the deployed version
- **Featured** — Toggle to show it on the homepage
- **Technologies** — Add tech tags (e.g. React, TypeScript, Prisma)

**Pro tip:** Write a compelling description that highlights the problem solved and the impact. Keep it under 160 characters for the card view, but you can add a full case study separately.`;
  }

  if (
    lower.includes('blog') &&
    (lower.includes('write') ||
      lower.includes('post') ||
      lower.includes('add') ||
      lower.includes('new') ||
      lower.includes('create'))
  ) {
    return `**Writing a Blog Post**

Head to **Admin → Blog** and click **New Post**. Here's a template to get started:

**Structure:**
\`\`\`
---
Title: [Your Post Title]
Slug: [auto-generated]
Excerpt: [1-2 sentence summary]
Category: [tutorial | opinion | update | other]
Published: [toggle when ready]
---

## Introduction
Hook the reader. What problem are you solving?

## The Problem
Describe the challenge or question you faced.

## Your Solution
Walk through your approach step by step.

## Key Takeaways
- Bullet point 1
- Bullet point 2
- Bullet point 3

## Conclusion
Wrap up with a call to action or next steps.
\`\`\`

**Tips:**
- Use clear, scannable headings
- Include code snippets where relevant
- Add a cover image for social sharing
- Keep paragraphs short (3-4 lines max)`;
  }

  if (
    lower.includes('bio') ||
    (lower.includes('about') &&
      (lower.includes('update') ||
        lower.includes('edit') ||
        lower.includes('change')))
  ) {
    return `**Updating Your About Section**

Head to **Admin → Settings** and look for the **About** section.

**What to include:**

1. **Headline** — A one-line summary of who you are
   - Example: "Full-stack developer passionate about clean architecture"

2. **Bio** — Your professional story (2-3 paragraphs)
   - What drives you
   - Your expertise areas
   - What makes you different

3. **Skills highlights** — Top 3-5 things you're known for

4. **Current focus** — What you're working on now

5. **Contact CTA** — How people can reach you

**Writing tips:**
- Write in first person ("I build..." not "Kael builds...")
- Lead with impact, not job titles
- Include specific achievements or metrics
- Keep it conversational but professional
- Update it every few months to stay current`;
  }

  if (
    lower.includes('experience') &&
    (lower.includes('add') || lower.includes('new') || lower.includes('create'))
  ) {
    return `**Adding Work Experience**

Head to **Admin → Experience** and click **New Experience**. Here's what to fill in:

**Required fields:**
- **Company** — The company or organization name
- **Role** — Your job title (e.g. "Senior Frontend Developer")
- **Start Date** — When you started
- **Description** — What you did in this role

**Optional:**
- **End Date** — Leave blank if this is your current role
- **Location** — City, Country or "Remote"
- **Company URL** — Link to the company website
- **Sort Order** — Controls the display order (lower = first)

**Writing a strong description:**
- Start each bullet with an action verb (Built, Led, Designed, Improved)
- Include specific metrics where possible
- Focus on outcomes, not just responsibilities
- Example: "Built a real-time dashboard that reduced support tickets by 40%"

**Pro tip:** Keep your experience list to your most relevant 3-5 roles. Quality over quantity.`;
  }

  if (
    lower.includes('skill') &&
    (lower.includes('add') || lower.includes('new'))
  ) {
    return `**Adding a Skill**

Head to **Admin → Skills** and click **New Skill**.

**Fields:**
- **Name** — The skill name (e.g. "TypeScript", "System Design")
- **Category** — Group it (e.g. "Languages", "Frameworks", "Tools")
- **Proficiency** — Your comfort level (1-5 or beginner/intermediate/expert)
- **Icon** — Pick an icon from the icon picker

**Tips:**
- Focus on skills relevant to your target roles
- Don't list every technology you've ever touched
- Group related skills together for readability
- Update proficiency levels as you grow`;
  }

  if (
    lower.includes('gear') ||
    lower.includes('equipment') ||
    lower.includes('setup')
  ) {
    return `**Managing Your Gear List**

Head to **Admin → Gears** to manage your setup showcase.

**For each item:**
- **Name** — What the item is (e.g. "MacBook Pro 16" M3 Max")
- **Category** — Group it (e.g. "Computer", "Audio", "Desk")
- **Description** — Why you chose it, what you use it for
- **Link** — Affiliate or product link (optional)
- **Image** — A photo of the item

**Popular categories:**
- Computer / Laptop
- Monitor / Display
- Keyboard / Mouse
- Audio / Microphone
- Desk / Chair
- Software / Tools

**Tip:** People love gear lists. Be specific about model numbers and share your honest opinion — what you love and what you'd change.`;
  }

  // Default helpful response
  return `**Hey! I'm your AI Assistant** 👋

I can help you manage your portfolio content. Here's what I can do:

**Quick actions I can help with:**
- 🗂️ **Add a new project** — Walk you through creating a project entry
- ✍️ **Write a blog post** — Provide a template and writing tips
- 👤 **Update your bio** — Help craft your about section
- 💼 **Add experience** — Guide you through adding work history
- 🛠️ **Manage skills** — Help organize your skill showcase
- ⚙️ **Gear list** — Update your setup page

**Or just ask me anything!** For example:
- "How do I make a project featured?"
- "What should I write in my bio?"
- "Help me describe my role at my last job"

Use the quick action buttons below or type your question.`;
}

export async function POST(req: NextRequest) {
  const { error: authError } = await requireAdmin(req);
  if (authError) return authError;

  try {
    const body: RequestBody = await req.json();

    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 },
      );
    }

    const response = generateResponse(body.message);

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 },
    );
  }
}

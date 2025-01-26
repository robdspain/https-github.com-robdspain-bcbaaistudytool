-- Create the 'quiz_attempts' table
    create table if not exists public.quiz_attempts (
      id uuid primary key default gen_random_uuid(),
      user_id uuid not null,
      main_category text not null,
      subcategory text not null,
      question_text text not null,
      selected_answer text not null,
      correct_answer text not null,
      is_correct boolean not null,
      time_taken_seconds integer not null,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      updated_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- Create the 'quiz_results' table
    create table if not exists public.quiz_results (
      id uuid primary key default gen_random_uuid(),
      user_id uuid not null,
      main_topic text not null,
      subtopic text not null,
      total_questions integer not null,
      correct_answers integer not null,
      incorrect_answers integer not null,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      updated_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- Create the 'subdomain_progress' table
    create table if not exists public.subdomain_progress (
      id uuid primary key default gen_random_uuid(),
      pacing_guide_id uuid not null,
      main_category text not null,
      subcategory text not null,
      target_accuracy integer not null,
      current_accuracy integer not null,
      priority_level integer not null,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
      foreign key (pacing_guide_id) references pacing_guides(id)
    );

    -- Create the 'user_preferences' table
    create table if not exists public.user_preferences (
      id uuid primary key default gen_random_uuid(),
      user_id uuid not null unique,
      last_main_topic text,
      last_subtopic text,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      updated_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- Create the 'generated_questions' table
    create table if not exists public.generated_questions (
      id uuid primary key default gen_random_uuid(),
      main_category text not null,
      subcategory text not null,
      question_text text not null,
      options text[] not null,
      correct_answer text not null,
      explanation text not null,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      updated_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- Create the 'question_exposures' table
    create table if not exists public.question_exposures (
      id uuid primary key default gen_random_uuid(),
      user_id uuid not null,
      question_id uuid not null,
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
      foreign key (question_id) references generated_questions(id)
    );

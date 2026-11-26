-- User table

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    name VARCHAR(120) NOT NULL,

    email VARCHAR(255) NOT NULL,

    phone_number VARCHAR(30) NOT NULL,

    role VARCHAR(20) NOT NULL
        CHECK (role IN ('candidate', 'admin')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Email uniqueness is case-insensitive
CREATE UNIQUE INDEX users_email_unique_idx
ON users (LOWER(email));


-- Hackathon table

CREATE TABLE hackathons (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    created_by_admin_id BIGINT NOT NULL
        REFERENCES users(id) ON DELETE RESTRICT,

    name VARCHAR(200) NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'future'
        CHECK (status IN ('future', 'ongoing', 'completed')),

    description TEXT,

    readme TEXT,

    starts_at TIMESTAMPTZ NOT NULL,

    ends_at TIMESTAMPTZ NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_hackathon_dates
        CHECK (ends_at > starts_at)
);

CREATE INDEX idx_hackathons_status
ON hackathons(status);

CREATE INDEX idx_hackathons_admin
ON hackathons(created_by_admin_id);

-- Hackathon Entry

CREATE TABLE hackathon_entries (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    hackathon_id BIGINT NOT NULL
        REFERENCES hackathons(id) ON DELETE CASCADE,

    created_by_candidate_id BIGINT NOT NULL
        REFERENCES users(id) ON DELETE RESTRICT,

    entry_type VARCHAR(20) NOT NULL
        CHECK (entry_type IN ('individual', 'team')),

    display_name VARCHAR(150) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Required for composite foreign keys
    UNIQUE (id, hackathon_id)
);

CREATE INDEX idx_hackathon_entries_hackathon
ON hackathon_entries(hackathon_id);

-- Hackathon Entry Members

CREATE TABLE hackathon_entry_members (
    hackathon_id BIGINT NOT NULL,

    entry_id BIGINT NOT NULL,

    candidate_id BIGINT NOT NULL
        REFERENCES users(id) ON DELETE RESTRICT,

    member_role VARCHAR(20) NOT NULL DEFAULT 'member'
        CHECK (member_role IN ('owner', 'member')),

    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (entry_id, candidate_id),

    -- A candidate can only belong to one entry per hackathon
    UNIQUE (hackathon_id, candidate_id),

    FOREIGN KEY (entry_id, hackathon_id)
        REFERENCES hackathon_entries(id, hackathon_id)
        ON DELETE CASCADE
);

CREATE INDEX idx_entry_members_candidate
ON hackathon_entry_members(candidate_id);

-- Hackathon submissions

CREATE TABLE hackathon_submissions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    hackathon_id BIGINT NOT NULL,

    entry_id BIGINT NOT NULL,

    level VARCHAR(20) NOT NULL
        CHECK (level IN ('screening', 'final')),

    submission_status VARCHAR(20) NOT NULL DEFAULT 'draft'
        CHECK (
            submission_status IN ('draft', 'submitted', 'graded')
        ),

    -- Screening submission
    synopsis_url TEXT,

    intro_video_url TEXT,

    -- Final submission
    github_repo_url TEXT,

    demo_video_url TEXT,

    -- Evaluation
    score NUMERIC(5,2),

    feedback TEXT,

    decision VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (decision IN ('pending', 'passed', 'rejected')),

    graded_by_admin_id BIGINT
        REFERENCES users(id) ON DELETE RESTRICT,

    submitted_at TIMESTAMPTZ,

    graded_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    FOREIGN KEY (entry_id, hackathon_id)
        REFERENCES hackathon_entries(id, hackathon_id)
        ON DELETE CASCADE,

    -- Only one submission record per level for each entry
    UNIQUE (entry_id, level),

    -- Screening and final submissions have different fields
    CONSTRAINT valid_submission_fields CHECK (
        (
            level = 'screening'
            AND github_repo_url IS NULL
            AND demo_video_url IS NULL
        )
        OR
        (
            level = 'final'
            AND synopsis_url IS NULL
            AND intro_video_url IS NULL
        )
    ),

    -- Required files must exist before submission
    CONSTRAINT required_submission_files CHECK (
        submission_status = 'draft'
        OR
        (
            level = 'screening'
            AND synopsis_url IS NOT NULL
            AND intro_video_url IS NOT NULL
        )
        OR
        (
            level = 'final'
            AND github_repo_url IS NOT NULL
            AND demo_video_url IS NOT NULL
        )
    ),

    -- Submission and grading timestamps
    CONSTRAINT valid_submission_status CHECK (
        (
            submission_status = 'draft'
            AND submitted_at IS NULL
        )
        OR
        (
            submission_status IN ('submitted', 'graded')
            AND submitted_at IS NOT NULL
        )
    ),

    CONSTRAINT valid_grading CHECK (
        (
            submission_status = 'graded'
            AND score IS NOT NULL
            AND score BETWEEN 0 AND 100
            AND graded_by_admin_id IS NOT NULL
            AND graded_at IS NOT NULL
            AND decision IN ('passed', 'rejected')
        )
        OR
        (
            submission_status <> 'graded'
            AND score IS NULL
            AND graded_by_admin_id IS NULL
            AND graded_at IS NULL
            AND decision = 'pending'
        )
    )
);

CREATE INDEX idx_submissions_hackathon_level
ON hackathon_submissions(hackathon_id, level);

CREATE INDEX idx_submissions_status
ON hackathon_submissions(submission_status);

-- Hackathon leaderboard

CREATE TABLE hackathon_leaderboard (
    hackathon_id BIGINT NOT NULL,

    entry_id BIGINT NOT NULL,

    rank INTEGER NOT NULL CHECK (rank > 0),

    total_score NUMERIC(6,2),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (hackathon_id, entry_id),

    FOREIGN KEY (entry_id, hackathon_id)
        REFERENCES hackathon_entries(id, hackathon_id)
        ON DELETE CASCADE
);

CREATE INDEX idx_leaderboard_ranking
ON hackathon_leaderboard(hackathon_id, rank);
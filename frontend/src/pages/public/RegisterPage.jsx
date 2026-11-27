
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import BrandLogo from "../../components/brand/BrandLogo";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/common/Toast";

import { Code2, ArrowRight } from "lucide-react";

export default function RegisterPage() {
    const { register } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [institution, setInstitution] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await register({
                name,
                email,
                phone,
                password,
                institution
            });

            toast(
                "Registration successful! Welcome to HackGuard AI.",
                "success"
            );

            navigate("/participant");

        } catch (err) {
            setError(
                err.message || "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface-soft flex flex-col justify-center items-center p-4 sm:p-6">
            <div className="w-full max-w-md space-y-6">

                <div className="text-center space-y-2">
                    <BrandLogo size="lg" className="justify-center" />

                    <h2 className="text-xl font-bold text-graphite">
                        Create HackGuard Account
                    </h2>

                    <p className="text-xs text-muted">
                        Register as a hackathon candidate
                    </p>
                </div>

                <div className="bg-surface-white border border-border-subtle rounded-xl p-6 sm:p-8 shadow-subtle">

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="flex items-center gap-2 text-sm font-semibold text-signal-blue">
                            <Code2 className="w-5 h-5" />
                            Candidate Registration
                        </div>

                        <Input
                            label="Full Name"
                            placeholder="Your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            label="Phone Number"
                            type="tel"
                            placeholder="9876543210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Minimum 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={8}
                            required
                        />

                        <Input
                            label="University or Organization"
                            placeholder="Your institution"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                        />

                        {error && (
                            <p
                                className="text-sm text-red-600"
                                role="alert"
                            >
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            loading={loading}
                            icon={ArrowRight}
                            iconPosition="right"
                        >
                            Create Account
                        </Button>

                    </form>
                </div>

                <div className="text-center text-xs text-muted">
                    Already registered?{" "}
                    <Link
                        to="/login"
                        className="text-signal-blue hover:underline font-semibold"
                    >
                        Sign In
                    </Link>
                </div>

                <p className="text-center text-xs text-muted">
                    Admin and Judge accounts are created through authorized invitations.
                </p>

            </div>
        </div>
    );
}
